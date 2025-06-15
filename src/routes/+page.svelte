<script lang="ts">
  import { supabase } from '$lib/supabase';

  function openSupabaseTestPage() {
    window.location.href = '/supabase-test'; // 使用 window.location.href 進行頁面跳轉
  }
</script>

<div class="container mx-auto px-4 py-8">
  <h1 class="text-4xl font-bold mb-8">英語字根學習系統</h1>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold mb-4">單字搜尋</h2>
      <p class="text-gray-600 mb-4">搜尋單字，了解其字根來源與相關解釋</p>
      <a href="/search" class="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        開始搜尋
      </a>
    </div>

    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold mb-4">批量查詢</h2>
      <p class="text-gray-600 mb-4">一次查詢多個單字的字根資訊</p>
      <a href="/batch" class="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        批量查詢
      </a>
    </div>
  </div>

  <div class="container mx-auto px-4 py-4">
    <div class="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 class="text-2xl font-semibold mb-4">Supabase 連線測試</h2>
      <p class="text-gray-600 mb-4">點擊下方按鈕，跳轉到新頁面測試 Supabase 資料庫連線並查看資料。</p>
      <button
        class="inline-block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        on:click={openSupabaseTestPage}
      >
        前往 Supabase 測試頁面
      </button>
    </div>
  </div>
</div>
