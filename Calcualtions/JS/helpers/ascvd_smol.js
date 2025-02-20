function computeTenYearScore(
  isMale,
  isBlack,
  smoker,
  hypertensive,
  diabetic,
  age,
  systolicBloodPressure,
  totalCholesterol,
  hdl
) {
  if (age < 40 || age > 79) {
    return "Age determined is not applicable.";
  }

  totalCholesterol *= 38.67;
  hdl *= 38.67;
  const lnAge = Math.log(age);
  const lnTotalChol = Math.log(totalCholesterol);
  const lnHdl = Math.log(hdl);
  const trlnsbp = hypertensive ? Math.log(systolicBloodPressure) : 0;
  const ntlnsbp = !hypertensive ? Math.log(systolicBloodPressure) : 0;
  const ageTotalChol = lnAge * lnTotalChol;
  const ageHdl = lnAge * lnHdl;
  const agetSbp = lnAge * trlnsbp;
  const agentSbp = lnAge * ntlnsbp;
  const ageSmoke = smoker ? lnAge : 0;

  let s010Ret, mnxbRet, predictRet;

  if (isBlack && !isMale) {
    s010Ret = 0.95334;
    mnxbRet = 86.6081;
    predictRet =
      17.1141 * lnAge +
      0.9396 * lnTotalChol +
      -18.9196 * lnHdl +
      4.4748 * ageHdl +
      29.2907 * trlnsbp +
      -6.4321 * agetSbp +
      27.8197 * ntlnsbp +
      -6.0873 * agentSbp +
      (smoker ? 0.6908 : 0) +
      (diabetic ? 0.8738 : 0);
  } else if (!isBlack && !isMale) {
    s010Ret = 0.96652;
    mnxbRet = -29.1817;
    predictRet =
      -29.799 * lnAge +
      4.884 * lnAge ** 2 +
      13.54 * lnTotalChol +
      -3.114 * ageTotalChol +
      -13.578 * lnHdl +
      3.149 * ageHdl +
      2.019 * trlnsbp +
      1.957 * ntlnsbp +
      (smoker ? 7.574 : 0) +
      -1.665 * ageSmoke +
      (diabetic ? 0.661 : 0);
  } else if (isBlack && isMale) {
    s010Ret = 0.89536;
    mnxbRet = 19.5425;
    predictRet =
      2.469 * lnAge +
      0.302 * lnTotalChol +
      -0.307 * lnHdl +
      1.916 * trlnsbp +
      1.809 * ntlnsbp +
      (smoker ? 0.549 : 0) +
      (diabetic ? 0.645 : 0);
  } else {
    s010Ret = 0.91436;
    mnxbRet = 61.1816;
    predictRet =
      12.344 * lnAge +
      11.853 * lnTotalChol +
      -2.664 * ageTotalChol +
      -7.99 * lnHdl +
      1.769 * ageHdl +
      1.797 * trlnsbp +
      1.764 * ntlnsbp +
      (smoker ? 7.837 : 0) +
      -1.795 * ageSmoke +
      (diabetic ? 0.658 : 0);
  }

  const pct = 1 - Math.pow(s010Ret, Math.exp(predictRet - mnxbRet));
  return `The risk of ASCVD in the upcoming 10-years is: ${
    Math.round(pct * 1000) / 10
  }%`; // Round to one decimal place
}

export default computeTenYearScore;

// // Test case 1
// const result1 = computeTenYearScore(
//   true, // isMale
//   false, // isBlack
//   true, // smoker
//   true, // hypertensive
//   true, // diabetic
//   45, // age
//   140, // systolicBloodPressure
//   200, // totalCholesterol
//   50 // hdl
// );
// console.log("Test case 1 result: " + result1); // Expected output will be based on input

// // Test case 2
// const result2 = computeTenYearScore(
//   false, // isMale
//   true, // isBlack
//   false, // smoker
//   false, // hypertensive
//   true, // diabetic
//   60, // age
//   130, // systolicBloodPressure
//   180, // totalCholesterol
//   60 // hdl
// );
// console.log("Test case 2 result: " + result2); // Expected output will be based on input

// // Test case 3
// const result3 = computeTenYearScore(
//   true, // isMale
//   true, // isBlack
//   false, // smoker
//   true, // hypertensive
//   false, // diabetic
//   50, // age
//   120, // systolicBloodPressure
//   220, // totalCholesterol
//   55 // hdl
// );
// console.log("Test case 3 result: " + result3); // Expected output will be based on input

// // Test case 4 - Invalid age (below 40)
// const result4 = computeTenYearScore(
//   false, // isMale
//   false, // isBlack
//   true, // smoker
//   true, // hypertensive
//   false, // diabetic
//   30, // age
//   150, // systolicBloodPressure
//   200, // totalCholesterol
//   45 // hdl
// );
// console.log("Test case 4 result: " + result4); // Expected output: null (invalid age)

// // Test case 5 - Invalid age (above 79)
// const result5 = computeTenYearScore(
//   true, // isMale
//   true, // isBlack
//   false, // smoker
//   true, // hypertensive
//   true, // diabetic
//   80, // age
//   120, // systolicBloodPressure
//   190, // totalCholesterol
//   60 // hdl
// );
// console.log("Test case 5 result: " + result5); // Expected output: null (invalid age)
