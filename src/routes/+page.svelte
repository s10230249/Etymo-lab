<script lang="ts">
  import { supabase } from '$lib/supabase';
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
</div>
