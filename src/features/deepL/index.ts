export const translateText = async (
  text: string,
  sourceLang: string,
  targetLang: string
): Promise<string> => {
  const apiUrl = "http://localhost:3000/deepl-translate";
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source_lang: sourceLang,
        target_lang: targetLang,
        text,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const translation: string = await response.text();
    return translation;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// async function main() {
//   try {
//     const translatedText = await translateText(textToTranslate, "EN", "FR");
//     console.log("Translation: ", translatedText);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }
