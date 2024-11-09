import axios, { AxiosResponse } from "axios";
import { load } from "cheerio";
import { BadRequestError } from "../core/ApiError";
// import { encode } from "js-base64";s

export async function loginIgracias(username: string, password: string) {
  const baseUrl = "https://igracias.telkomuniversity.ac.id";

  const headers = {
    Host: "igracias.telkomuniversity.ac.id",
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Expires: "0",
    "sec-ch-ua":
      '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "Upgrade-Insecure-Requests": "1",
    Origin: baseUrl,
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
    Accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "Sec-Fetch-Site": "same-origin",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-User": "?1",
    "Sec-Fetch-Dest": "document",
    Referer: baseUrl,
    "Accept-Language": "en-US,en;q=0.9",
  };

  // Initial GET request to retrieve cookies
  const initialResponse: AxiosResponse = await axios.get(baseUrl, { headers });
  const cookieString = initialResponse.headers["set-cookie"] || [];
  const cookies = cookieString.join("; ");

  if (!cookies) throw new Error("Cookies not found");

  // POST request to log in
  await axios.post(
    baseUrl,
    new URLSearchParams({
      textUsername: username,
      textPassword: password,
      submit: "Login",
    }),
    {
      headers: {
        Cookie: cookies,
        ...headers,
      },
      validateStatus: (status) =>
        (status >= 200 && status < 300) || status === 500, // Allow 500 as successful
    }
  );

  const userDataResponse: AxiosResponse = await axios.get(
    "https://igracias.telkomuniversity.ac.id/index.php?pageid=2941",
    {
      headers: {
        Cookie: cookies,
        ...headers,
      },
    }
  );

  const $ = load(userDataResponse.data);

  const nim = $("title").text().split("\n")[1]?.split(" ")[0];

  if (nim === "i-GRACIAS") throw new BadRequestError("Login failed");

  const fullName = $("h5.centered").first().text().trim();
  const email = $("span:contains('Email Anda')").next().text().trim();
  const imageUrl = $("img[src*='PAS_FOTO']").attr("src")?.trim();

  const classInfo = $("span.label-text:contains('Kelas :')")
    .text()
    .replace("Kelas :", "")
    .trim();

  const userGroup = $("a.centered:contains('Grup Pengguna :')")
    .text()
    .replace("Grup Pengguna :", "")
    .trim();

  const major = $("span.label-text").text().split(")")[1].trim();

  return { nim, fullName, email, imageUrl, classInfo, userGroup, major };
}
