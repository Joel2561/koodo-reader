export const isTitle = (
  line: string,
  isContainDI: boolean = false,
  isContainChapter: boolean = false,
  isContainCHAPTER: boolean = false
) => {
  return (
    line.length < 30 &&
    line.indexOf("[") === -1 &&
    line.indexOf("(") === -1 &&
    (line.startsWith("CHAPTER") ||
      line.startsWith("Chapter") ||
      line.startsWith("序章") ||
      line.startsWith("前言") ||
      line.startsWith("写在前面的话") ||
      line.startsWith("后记") ||
      line.startsWith("楔子") ||
      line.startsWith("后序") ||
      line.startsWith("寫在前面的話") ||
      line.startsWith("後記") ||
      line.startsWith("後序") ||
      (line.startsWith("第") && startWithDI(line)) ||
      (!isContainDI &&
        !isContainChapter &&
        !isContainCHAPTER &&
        line.indexOf("第") > -1 &&
        (line[line.indexOf("第") - 1] === " " ||
          line[line.indexOf("第") - 1] === "　" ||
          line[line.indexOf("第") - 1] === "、" ||
          line[line.indexOf("第") - 1] === "：" ||
          line[line.indexOf("第") - 1] === ":") &&
        startWithDI(line.substr(line.indexOf("第")))) ||
      (!isContainDI &&
        !isContainChapter &&
        !isContainCHAPTER &&
        line.indexOf(" ") &&
        startWithNumAndSpace(line)) ||
      (!isContainDI &&
        !isContainChapter &&
        !isContainCHAPTER &&
        line.indexOf("　") &&
        startWithNumAndSpace(line)) ||
      (!isContainDI &&
        !isContainChapter &&
        !isContainCHAPTER &&
        line.indexOf("、") &&
        startWithNumAndPause(line)) ||
      (!isContainDI &&
        !isContainChapter &&
        !isContainCHAPTER &&
        line.indexOf("：") &&
        startWithNumAndColon(line)) ||
      (!isContainDI &&
        !isContainChapter &&
        !isContainCHAPTER &&
        line.indexOf(":") &&
        startWithNumAndColon(line)))
  );
};
const startWithDI = (line: string) => {
  let keywords = [
    "章",
    "节",
    "回",
    "節",
    "卷",
    "部",
    "輯",
    "辑",
    "話",
    "集",
    "话",
    "篇",
  ];
  let flag = false;
  for (let i = 0; i < keywords.length; i++) {
    if (
      (line.indexOf(keywords[i]) > -1 &&
        (line[line.indexOf(keywords[i]) + 1] === " " ||
          line[line.indexOf(keywords[i]) + 1] === "　" ||
          line[line.indexOf(keywords[i]) + 1] === "、" ||
          line[line.indexOf(keywords[i]) + 1] === "：" ||
          line[line.indexOf(keywords[i]) + 1] === ":")) ||
      !line[line.indexOf(keywords[i]) + 1]
    ) {
      if (
        /^[\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341\u767e\u5343\u4e07\u842c]+$/.test(
          line.substring(1, line.indexOf(keywords[i]))
        ) ||
        /^\d+$/.test(line.substring(1, line.indexOf(keywords[i])))
      ) {
        flag = true;
      }
      if (flag) break;
    }
  }
  return flag;
};

const startWithNumAndSpace = (line: string) => {
  if (
    /^[\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341\u767e\u5343\u4e07\u842c]+$/.test(
      line.substring(0, line.indexOf(" "))
    )
  )
    return true;
  if (
    /^[\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341\u767e\u5343\u4e07\u842c]+$/.test(
      line.substring(0, line.indexOf("　"))
    )
  )
    return true;

  if (/^\d+$/.test(line.substring(0, line.indexOf(" ")))) return true;
  if (/^\d+$/.test(line.substring(0, line.indexOf("　")))) return true;
  return false;
};
const startWithNumAndColon = (line: string) => {
  if (
    /^[\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341\u767e\u5343\u4e07\u842c]+$/.test(
      line.substring(0, line.indexOf(":"))
    )
  )
    return true;
  if (
    /^[\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341\u767e\u5343\u4e07\u842c]+$/.test(
      line.substring(0, line.indexOf("："))
    )
  )
    return true;

  if (/^\d+$/.test(line.substring(0, line.indexOf(":")))) return true;
  if (/^\d+$/.test(line.substring(0, line.indexOf("：")))) return true;
  return false;
};
const startWithNumAndPause = (line: string) => {
  if (
    /^[\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341\u767e\u5343\u4e07\u842c]+$/.test(
      line.substring(0, line.indexOf("、"))
    )
  )
    return true;

  if (/^\d+$/.test(line.substring(0, line.indexOf("、")))) return true;
  return false;
};