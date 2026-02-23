import { createMatcher } from '../frcMatcher';

const sampleResponses = {
  "frc nedir": "FRC açıklama",
  "nasıl kayıt olunur": "kayıt açıklama",
  "wpilib nedir": "WPILib açıklama",
  "motor kontrolü": "motor kontrol açıklama",
  "pid nedir": "PID açıklama",
  "bilinmeyen": "Bu soruyu şu an cevaplayamıyorum."
};

describe('FRC Matcher', () => {
  let matcher;

  beforeEach(() => {
    matcher = createMatcher(sampleResponses);
  });

  test('direct match returns exact response', () => {
    expect(matcher.getResponse("frc nedir")).toBe("FRC açıklama");
    expect(matcher.getResponse("wpilib nedir")).toBe("WPILib açıklama");
  });

  test('fuzzy match returns best match', () => {
    expect(matcher.getResponse("frc ne")).toContain("FRC açıklama");
    expect(matcher.getResponse("wpilib")).toContain("WPILib açıklama");
  });

  test('keyword fallback works for registration', () => {
    expect(matcher.getResponse("kayıt")).toContain("kayıt açıklama");
    expect(matcher.getResponse("ücret")).toContain("kayıt açıklama");
    expect(matcher.getResponse("başvuru")).toContain("kayıt açıklama");
  });

  test('keyword fallback works for FRC', () => {
    expect(matcher.getResponse("robotik")).toContain("FRC açıklama");
    expect(matcher.getResponse("first")).toContain("FRC açıklama");
    expect(matcher.getResponse("yarışma")).toContain("FRC açıklama");
  });

  test('keyword fallback works for WPILib', () => {
    expect(matcher.getResponse("java")).toContain("WPILib açıklama");
    expect(matcher.getResponse("programlama")).toContain("WPILib açıklama");
    expect(matcher.getResponse("kod")).toContain("WPILib açıklama");
  });

  test('keyword fallback works for motor control', () => {
    expect(matcher.getResponse("motor")).toContain("motor kontrol açıklama");
    expect(matcher.getResponse("hız")).toContain("motor kontrol açıklama");
    expect(matcher.getResponse("encoder")).toContain("motor kontrol açıklama");
  });

  test('keyword fallback works for PID', () => {
    expect(matcher.getResponse("pid")).toContain("PID açıklama");
    expect(matcher.getResponse("hassasiyet")).toContain("PID açıklama");
  });

  test('empty input returns instruction message', () => {
    expect(matcher.getResponse("")).toBe("Lütfen bir soru yazın.");
    expect(matcher.getResponse("   ")).toBe("Lütfen bir soru yazın.");
  });

  test('unknown query returns fallback message', () => {
    expect(matcher.getResponse("anlamsız soru")).toBe("Bu soruyu şu an cevaplayamıyorum.");
    expect(matcher.getResponse("xyz123")).toBe("Bu soruyu şu an cevaplayamıyorum.");
  });

  test('case insensitive matching', () => {
    expect(matcher.getResponse("FRC NEDİR")).toBe("FRC açıklama");
    expect(matcher.getResponse("Frc Nedir")).toBe("FRC açıklama");
  });

  test('trim whitespace from input', () => {
    expect(matcher.getResponse("  frc nedir  ")).toBe("FRC açıklama");
    expect(matcher.getResponse("\tfrc nedir\n")).toBe("FRC açıklama");
  });
});
