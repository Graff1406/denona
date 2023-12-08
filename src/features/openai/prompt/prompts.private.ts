export const lifeSphere = `Conditions: 
  1. response should contain a JSON format array with {{length}} objects of type {en: {label: '', hint: ''}, de: {label: '', hint: ''}, ka: {label: '', hint: ''}, ua: {label: '', hint: ''}, ru: {label: '', hint: ''}}.
  2. you need to come up with human spheres of life closely related to {{value}}. the sphere of life should be common.
  3. "label" presents a title similar in the sense to {{value}}. "label" must be at least 2-3 words separately “and”.
  4. "hint" is an extended additional description for “label”. "hint" must be a maximum of 150 characters.
`;

export const goalDescription = `Response must be in JSON format: { "labels": [] }. Use title: {{title}}, life sphere: {{lifeSphere}}, and also if there is the following description: {{description}}. for create an array of keywords, consisting of one word, and push it to the "labels" array with a minimum of 3 items but if the passed context allows you to create more than three keywords, then be sure to add labels to the array. Keywords should be English letters.
`;

export const taskRecommendationsAndPrecautions = `Response must be in JSON format: { "recommendations": [], "precautions": [] }. Each array must contain 5 elements. recommendations and precautions must be based on and related to the area of life: {{LS}}, as well as for the purpose: {{goal}}. `;

export const taskRecommendedExpectedResults = `Response must be in JSON format: { "recommendations": [] }. The expected results array must contain 10 elements. Each item must be based on and related to the area of life: {{LS}}, as well as for the goal: {{goal}}. What specific results can be obtained by achieving the goal?`;
