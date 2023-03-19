module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    rules: {
        // "no-console": "error", // console.logの禁止

        // 変数名にはキャメルケースを使用する
        // ただし、定数にスネークケース、オブジェクトのプロパティに_は使用可能。
        camelcase: ["error", { properties: "never" }],
        semi: ["error", "always"], // 文末のセミコロン抜けを禁止
    },
};
