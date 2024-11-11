<template>
  <div class="flex flex-col justify-center p-6 gap-10 h-screen">
    <div>
        <h1 class="font-bold text-4xl">Hello!</h1>
        <h2 class="text-gray-500 mt-2">Please input your email and password</h2>
    </div>
    <div class="flex flex-col gap-2 w-full">
      <input type="email" placeholder="Email" class="p-4 rounded-full border" />
      <input type="password" placeholder="Password" class="p-4 rounded-full border" />
    </div>
    <div class="flex justify-center w-full">    
      <button
        type="submit"
        class="bg-red-600 hover:bg-blue-700 text-white font-medium rounded-xl px-4 py-2.5 text-lg w-full"
      >
        Login
      </button>
    </div>
  </div>
</template>

<script></script>

<style></style>
