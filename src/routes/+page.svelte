<script lang="ts">
  let query = '';
  let result: any = null;
  let rootDetail: any = null;
  let loading = false;
  let errorMsg = '';

  async function searchWord() {
    errorMsg = '';
    result = null;
    rootDetail = null;
    if (!query.trim()) {
      errorMsg = '請輸入要查詢的單字';
      return;
    }
    loading = true;
    const res = await fetch(`/api/word?word=${encodeURIComponent(query.trim())}`);
    const data = await res.json();
    loading = false;
    if (data.error || !data.data || data.data.length === 0) {
      errorMsg = '查無此單字，請重新輸入。';
    } else {
      result = data.data[0];
    }
  }

  async function showRootDetail(root_form: string) {
    rootDetail = null;
    const res = await fetch(`/api/root?root_form=${encodeURIComponent(root_form)}`);
    const data = await res.json();
    if (data.data && data.data.length > 0) {
      rootDetail = data.data[0];
    }
  }
</script>

<div class="flex flex-col min-h-screen bg-gray-50">
  <main class="flex-grow flex flex-col items-center justify-center">
    <div class="w-full max-w-2xl mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold mb-8 text-center">英語字根學習系統</h1>
      <div class="bg-white p-8 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold mb-4">單字搜尋</h2>
        <p class="text-gray-600 mb-4">搜尋單字，了解其字根來源與相關解釋</p>
        <input
          class="border rounded px-3 py-2 w-full mb-2"
          type="text"
          placeholder="請輸入英文單字"
          bind:value={query}
          on:keydown={(e) => e.key === 'Enter' && searchWord()}
        />
        <button
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
          on:click={searchWord}
          disabled={loading}
        >
          {loading ? '查詢中...' : '開始搜尋'}
        </button>
        {#if errorMsg}
          <p class="text-red-500 mt-2">{errorMsg}</p>
        {/if}
        {#if result}
          <div class="mt-6 border-t pt-4">
            <h3 class="text-xl font-bold mb-2">查詢結果</h3>
            <table class="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th class="py-2 px-4 border-b">詞彙</th>
                  <th class="py-2 px-4 border-b">字根形式</th>
                  <th class="py-2 px-4 border-b">中文解釋</th>
                  <th class="py-2 px-4 border-b">功能類型</th>
                  <th class="py-2 px-4 border-b">其他說明</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="py-2 px-4 border-b">{result.word}</td>
                  <td class="py-2 px-4 border-b">
                    <button
                      type="button"
                      class="text-blue-600 underline bg-transparent border-0 cursor-pointer"
                      on:click={() => showRootDetail(result.root_form)}
                    >
                      {result.root_form}
                    </button>
                  </td>
                  <td class="py-2 px-4 border-b">{result.chinese_meaning}</td>
                  <td class="py-2 px-4 border-b">{result.function_type || result.category}</td>
                  <td class="py-2 px-4 border-b">{result.affixes}</td>
                </tr>
              </tbody>
            </table>
          </div>
        {/if}
        {#if rootDetail}
          <div class="mt-6 border-t pt-4">
            <h3 class="text-lg font-bold mb-2">字根變體表</h3>
            <table class="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th class="py-2 px-4 border-b">形式</th>
                  <th class="py-2 px-4 border-b">功能分類</th>
                  <th class="py-2 px-4 border-b">教學語句</th>
                  <th class="py-2 px-4 border-b">語言學備註</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="py-2 px-4 border-b">{rootDetail.root_form}</td>
                  <td class="py-2 px-4 border-b">{rootDetail.category}</td>
                  <td class="py-2 px-4 border-b">{rootDetail.teaching_note}</td>
                  <td class="py-2 px-4 border-b">{rootDetail.linguistic_note}</td>
                </tr>
              </tbody>
            </table>
          </div>
        {/if}
      </div>
    </div>
  </main>

  <!-- 下方功能區塊 -->
  <footer class="w-full flex flex-col items-center gap-2 pb-6">
    <a href="/batch" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm opacity-70 mt-2">批量查詢</a>
    <button
      class="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 text-sm opacity-50 cursor-not-allowed mt-1"
      style="pointer-events: none;"
    >
      Supabase 連線測試
    </button>
  </footer>
</div>
