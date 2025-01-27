import math


def compute_ten_year_score(
    isMale,
    isBlack,
    smoker,
    hypertensive,
    diabetic,
    age,
    systolicBloodPressure,
    totalCholesterol,
    hdl,
):
    """
    Args:
        isMale (bool)
        isBlack (bool)
        smoker (bool)
        hypertensive (bool)
        diabetic (bool)
        age (int)
        systolicBloodPressure (int)
        totalCholesterol (int)
        hdl (int)
    """
    if age < 40 or age > 79:
        return None
    totalCholesterol *= 38.67
    hdl *= 38.67
    lnAge = math.log(age)
    lnTotalChol = math.log(totalCholesterol)
    lnHdl = math.log(hdl)
    trlnsbp = math.log(systolicBloodPressure) if hypertensive else 0
    ntlnsbp = 0 if hypertensive else math.log(systolicBloodPressure)
    ageTotalChol = lnAge * lnTotalChol
    ageHdl = lnAge * lnHdl
    agetSbp = lnAge * trlnsbp
    agentSbp = lnAge * ntlnsbp
    ageSmoke = lnAge if smoker else 0
    if isBlack and not isMale:
        s010Ret = 0.95334
        mnxbRet = 86.6081
        predictRet = (
            17.1141 * lnAge
            + 0.9396 * lnTotalChol
            + -18.9196 * lnHdl
            + 4.4748 * ageHdl
            + 29.2907 * trlnsbp
            + -6.4321 * agetSbp
            + 27.8197 * ntlnsbp
            + -6.0873 * agentSbp
            + (0.6908 if smoker else 0)
            + (0.8738 if diabetic else 0)
        )
    elif not isBlack and not isMale:
        s010Ret = 0.96652
        mnxbRet = -29.1817
        predictRet = (
            -29.799 * lnAge
            + 4.884 * lnAge ** 2
            + 13.54 * lnTotalChol
            + -3.114 * ageTotalChol
            + -13.578 * lnHdl
            + 3.149 * ageHdl
            + 2.019 * trlnsbp
            + 1.957 * ntlnsbp
            + (7.574 if smoker else 0)
            + -1.665 * ageSmoke
            + (0.661 if diabetic else 0)
        )
    elif isBlack and isMale:
        s010Ret = 0.89536
        mnxbRet = 19.5425
        predictRet = (
            2.469 * lnAge
            + 0.302 * lnTotalChol
            + -0.307 * lnHdl
            + 1.916 * trlnsbp
            + 1.809 * ntlnsbp
            + (0.549 if smoker else 0)
            + (0.645 if diabetic else 0)
        )
    else:
        s010Ret = 0.91436
        mnxbRet = 61.1816
        predictRet = (
            12.344 * lnAge
            + 11.853 * lnTotalChol
            + -2.664 * ageTotalChol
            + -7.99 * lnHdl
            + 1.769 * ageHdl
            + 1.797 * trlnsbp
            + 1.764 * ntlnsbp
            + (7.837 if smoker else 0)
            + -1.795 * ageSmoke
            + (0.658 if diabetic else 0)
        )

    pct = 1 - s010Ret ** math.exp(predictRet - mnxbRet)
    return round(pct * 100 * 10) / 10

# Test case 1
# result1 = compute_ten_year_score(
#     isMale=True,      # isMale
#     isBlack=False,    # isBlack
#     smoker=True,      # smoker
#     hypertensive=True, # hypertensive
#     diabetic=True,    # diabetic
#     age=45,           # age
#     systolicBloodPressure=140,  # systolicBloodPressure
#     totalCholesterol=200,      # totalCholesterol
#     hdl=50                   # hdl
# )
# print("Test case 1 result:", result1)  # Expected output will be based on input

# # Test case 2
# result2 = compute_ten_year_score(
#     isMale=False,     # isMale
#     isBlack=True,     # isBlack
#     smoker=False,     # smoker
#     hypertensive=False, # hypertensive
#     diabetic=True,    # diabetic
#     age=60,           # age
#     systolicBloodPressure=130,  # systolicBloodPressure
#     totalCholesterol=180,      # totalCholesterol
#     hdl=60                   # hdl
# )
# print("Test case 2 result:", result2)  # Expected output will be based on input

# # Test case 3
# result3 = compute_ten_year_score(
#     isMale=True,      # isMale
#     isBlack=True,     # isBlack
#     smoker=False,     # smoker
#     hypertensive=True, # hypertensive
#     diabetic=False,   # diabetic
#     age=50,           # age
#     systolicBloodPressure=120,  # systolicBloodPressure
#     totalCholesterol=220,      # totalCholesterol
#     hdl=55                   # hdl
# )
# print("Test case 3 result:", result3)  # Expected output will be based on input

# # Test case 4 - Invalid age (below 40)
# result4 = compute_ten_year_score(
#     isMale=False,     # isMale
#     isBlack=False,    # isBlack
#     smoker=True,      # smoker
#     hypertensive=True, # hypertensive
#     diabetic=False,   # diabetic
#     age=30,           # age
#     systolicBloodPressure=150,  # systolicBloodPressure
#     totalCholesterol=200,      # totalCholesterol
#     hdl=45                   # hdl
# )
# print("Test case 4 result:", result4)  # Expected output: None (invalid age)

# # Test case 5 - Invalid age (above 79)
# result5 = compute_ten_year_score(
#     isMale=True,      # isMale
#     isBlack=True,     # isBlack
#     smoker=False,     # smoker
#     hypertensive=True, # hypertensive
#     diabetic=True,    # diabetic
#     age=80,           # age
#     systolicBloodPressure=120,  # systolicBloodPressure
#     totalCholesterol=190,      # totalCholesterol
#     hdl=60                   # hdl
# )
# print("Test case 5 result:", result5)  # Expected output: None (invalid age)