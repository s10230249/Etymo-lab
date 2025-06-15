<script lang="ts">
  import { supabase, testSupabaseConnection } from '$lib/supabase';
  import { onMount } from 'svelte';

  let connectionMessage = '正在測試連線並獲取資料...';
  let wordsData: any[] = [];
  let isLoading = false;

  async function initializeConnectionAndFetchWords() {
    isLoading = true;
    connectionMessage = '正在測試連線並獲取資料...';
    wordsData = []; // 清空之前的資料

    // 呼叫之前在 supabase.ts 中定義的測試函數
    const isConnected = await testSupabaseConnection();

    if (isConnected) {
      // 如果基本連線測試成功，則嘗試從 'words' 表格獲取資料
      // 注意：這裡只獲取前 5 筆資料，您可以根據需要調整 limit() 的值
      const { data, error } = await supabase!.from('words').select('*').limit(5);

      if (error) {
        console.error('❌ 從 Supabase 獲取資料失敗：', error.message);
        connectionMessage = `❌ 從 Supabase 獲取資料失敗：${error.message}`;
      } else if (data && data.length > 0) {
        console.log('✅ 成功從 Supabase 獲取資料:', data);
        connectionMessage = '✅ Supabase 連線成功並成功獲取資料！';
        wordsData = data;
      } else {
        console.warn('⚠️ Supabase 連線成功，但未獲取到資料（可能表格為空或限制導致）。');
        connectionMessage = '✅ Supabase 連線成功，但未獲取到資料。';
      }
    } else {
      connectionMessage = '❌ Supabase 連線測試失敗。請檢查此頁面的開發者控制台錯誤訊息。';
    }
    isLoading = false;
  }

  // 頁面載入時自動執行連線測試
  onMount(async () => {
    await initializeConnectionAndFetchWords();
  });
</script>

<div class="container mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4">Supabase 連線測試結果</h1>

  <p class="mt-4 text-lg">狀態：{connectionMessage}</p>

  {#if isLoading}
    <p class="mt-4">載入中...</p>
  {:else if wordsData.length > 0}
    <h2 class="text-xl font-semibold mt-6 mb-3">words 表格前 {wordsData.length} 筆資料：</h2>
    <table class="min-w-full bg-white border border-gray-300">
      <thead>
        <tr>
          <th class="py-2 px-4 border-b text-left">ID</th>
          <th class="py-2 px-4 border-b text-left">Word</th>
          <th class="py-2 px-4 border-b text-left">Chinese Meaning</th>
        </tr>
      </thead>
      <tbody>
        {#each wordsData as word (word.id)}
          <tr>
            <td class="py-2 px-4 border-b">{word.id}</td>
            <td class="py-2 px-4 border-b">{word.word}</td>
            <td class="py-2 px-4 border-b">{word.chinese_meaning}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {:else if connectionMessage.includes('成功') && !connectionMessage.includes('未獲取到資料')}
    <p class="mt-4">Supabase 連線成功，但 'words' 表格中沒有獲取到資料。</p>
  {/if}
</div>

<!-- 如果您的專案沒有安裝 Tailwind CSS，您可能需要移除或替換上述 class 屬性來符合您的 CSS 框架或自訂樣式。 --> 