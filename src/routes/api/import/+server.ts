import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';

// 您的 Markdown 內容將在這裡被解析和插入
const markdownContent = `### 字根變體表：spect / spic / spec

| 形式   | 功能分類（參考）    | 教學語句（學生用）                | 語言學備註（專業內容）                                                                                                                                        |
|:-------|:--------------------|:----------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| spect  | 主幹動作            | spect 是看這個動作                | 源自拉丁動詞 *specere*（to look），其本身來自 PIE 語根 *spek-*（to observe, see）。此形式保留原始詞幹構造，常作為基底字幹用於派生單字如 inspect, respect 等。 |
| spic   | 音變變體（syncope） | spic 是短化變體，用於接尾或動詞中 | 為 *specere* 的內部音節縮約變體，符合拉丁詞根 syncope（母音脫落）現象，在遇到某些接尾詞時為避免音節重複或口語簡化而產生，如 conspicuous, suspicious 等。      |
| spec   | 簡化詞幹（apocope） | spec 是字尾簡化後的詞幹           | 拉丁語中常見 apocope（尾音消失）現象，將 *spec-* 保留而移除不發音的字尾 e，便於與後綴結合形成複合詞，如 specimen, specific, speculate 等。                    |

### 詞彙整理表：spect / spic / spec

| 詞彙        | 字根形式   | 中文解釋   | 功能類型   | 其他字根／詞綴說明                                                   |
|:------------|:-----------|:-----------|:-----------|:---------------------------------------------------------------------|
| special     | spec       | 特別的     | 簡化詞幹   | <-ial> = 形容詞後綴，<spec> 來自 PIE *spek-*，原意為『被看出區別的』 |
| specific    | spec       | 明確的     | 簡化詞幹   | <-fic> = 做（PIE *dhe-）                                             |
| specimen    | spec       | 樣本       | 簡化詞幹   | <-men> = 結構名詞尾                                                  |
| speculate   | spec       | 推測       | 簡化詞幹   | <-ulate> = 動詞尾                                                    |
| inspect     | spect      | 檢查       | 主幹動作   | <in> = into（深入）                                                  |
| respect     | spect      | 尊敬       | 主幹動作   | <re> = again（再次）                                                 |
| retrospect  | spect      | 回顧       | 主幹動作   | <retro> = backward（向後）                                           |
| spectacle   | spect      | 奇觀       | 主幹動作   | <-acle> = 名詞後綴                                                   |
| conspicuous | spic       | 明顯的     | 音變變體   | <con> = together（共同）+ <-uous> = 形容詞尾                         |
| suspicious  | spic       | 可疑的     | 音變變體   | <sus> = under（潛藏）+ <-ious> = 形容詞尾                            |`;

export async function GET() {
  try {
    // 解析字根變體表
    const rootVariantsSection = markdownContent.split('### 詞彙整理表：spect / spic / spec')[0];
    const rootVariantsLines = rootVariantsSection.split('\n').filter(line => line.startsWith('|') && !line.includes('---')).slice(1);

    const rootsToInsert = [];
    for (const line of rootVariantsLines) {
      const parts = line.split('|').map(p => p.trim()).filter(p => p !== '');
      if (parts.length >= 4) {
        rootsToInsert.push({
          root_form: parts[0],
          category: parts[1],
          teaching_note: parts[2],
          linguistic_note: parts[3],
          origin: null, // 或 'PIE' 等實際值，避免用 N/A
        });
      }
    }

    console.log('rootsToInsert:', rootsToInsert);

    const { data: insertedRoots, error: rootsError } = await supabase
      .from('roots')
      .upsert(rootsToInsert, { onConflict: 'root_form' })
      .select();

    if (rootsError) {
      console.error('🔴 Error inserting roots:', rootsError.message, rootsError.details);
      return json({ error: rootsError.message, details: rootsError.details }, { status: 500 });
    }

    // 解析詞彙整理表
    const wordSection = markdownContent.split('### 詞彙整理表：spect / spic / spec')[1];
    const wordLines = wordSection.split('\n').filter(line => line.startsWith('|') && !line.includes('---')).slice(1);

    const wordsToInsert = [];
    const seenWords = new Set();

    for (const line of wordLines) {
      const parts = line.split('|').map(p => p.trim()).filter(p => p !== '');
      if (parts.length >= 5) {
        const word = parts[0];
        if (seenWords.has(word)) {
          continue; // Skip duplicate words
        }
        seenWords.add(word);

        const rootForm = parts[1];
        const relatedRoot = insertedRoots.find((root: { root_form: string; id: number }) => root.root_form === rootForm);
        
        wordsToInsert.push({
          word: word,
          chinese_meaning: parts[2],
          root_id: relatedRoot ? relatedRoot.id : null,
          root_form: rootForm,
          affixes: parts[4],
        });
      }
    }

    console.log('wordsToInsert:', wordsToInsert); // 添加這行以便於排錯

    const { error: wordsError } = await supabase
      .from('words')
      .upsert(wordsToInsert, { onConflict: 'word' });

    if (wordsError) {
      console.error('🔴 Error inserting words:', wordsError.message, wordsError.details);
      throw new Error('Failed to insert words.');
    }

    return json({ message: 'Data imported successfully!' });
  } catch (error: any) {
    return json({ error: error.message }, { status: 500 });
  }
} 