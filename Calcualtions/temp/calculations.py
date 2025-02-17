from ascvd_smol import compute_ten_year_score


def TSAT(Fe: int, TIBC: int, gender: str):
    tsat = (Fe / TIBC) * 100
    if gender.lower() == "m":
        return f"TSAT = {round(tsat, 2)}, < 12%, IDA!!!!DANGER!!! ur gonna dieee!! I am watching u 👁️  👁️"
    elif gender.lower() == "f":
        return f"TSAT = {round(tsat, 2)}, < 15%, IDA"
    else:
        return "GAYYYYYYYYYY!"


def Mentz(MCV: int, RBC: int):
    mentz = MCV / RBC
    if mentz > 13:
        return f"Mentz = {round(mentz, 2)}, IDA."
    elif mentz < 13:
        return f"Mentz = {round(mentz, 2)}, Beta thal."
    else:
        return f"Mentz = {round(mentz, 2)}, IDA + Beta thal, ur cooked!"


def ESR(age: int, gender: str):
    if gender.lower() == "m":
        return f"upper range of ESR = {round(age / 2, 2)}"
    elif gender.lower() == "f":
        return f"upper range of ESR = {round((age + 10) / 2, 2)}"
    else:
        return "GAYYYYYYYYYY!"


def CRP(age: int, gender: str):
    if gender.lower() == "m":
        return f"upper range of CRP = {round((age / 50), 2)}"
    elif gender.lower() == "f":
        return f"upper range of CRP = {round(age / 50 + 0.6, 2)}"
    else:
        return "GAYYYYYYYYYY!"


def W_to_H(w: int, h: int, gender: str):
    ratio = w / h
    if gender.lower() == "m":
        if ratio > 0.9 or w > 102:
            return f"W:H = {round(ratio, 2)}, Abnormal."
        else:
            return f"W:H = {round(ratio, 2)}, Optimal ^_^."
    elif gender.lower() == "f":
        if ratio > 0.85 or w > 88:
            return f"W:H = {round(ratio, 2)}, Abnormal."
        else:
            return f"W:H = {round(ratio, 2)}, Optimal ^_^."
    else:
        return "GAYYYYYYYYYY!"


def GFR(age: int, creatinine: float, gender: str, cystatin=0.0):
    creatinine /= 88.4  #!Fix the conversion
    if gender.lower() not in ["f", "m"]:
        return "GAYYYYYYYYYY!"
    if cystatin != 0:
        if gender.lower() == "f":
            A, C = 0.7, 0.8
            if cystatin <= 0.8:
                if creatinine <= 0.7:
                    D = -0.323
                    B = -0.219
                else:
                    D = -0.323
                    B = -0.544
            else:
                if creatinine <= 0.7:
                    D = -0.778
                    B = -0.219
                else:
                    D = -0.778
                    B = -0.544
        elif gender.lower() == "m":
            A, C = 0.9, 0.8
            if cystatin <= 0.8:
                if creatinine <= 0.9:
                    D = -0.323
                    B = -0.144
                else:
                    D = -0.323
                    B = -0.544
            else:
                if creatinine <= 0.9:
                    D = -0.778
                    B = -0.144
                else:
                    D = -0.778
                    B = -0.544
        gfr = 135 * (creatinine / A) ** B * (cystatin / C) ** D * 0.9961**age
    else:
        if gender.lower() == "f":
            A = 0.7
            if creatinine <= 0.7:
                B = -0.241
            else:
                B = -1.2
        elif gender.lower() == "m":
            A = 0.9
            if creatinine <= 0.9:
                B = -0.302
            else:
                B = -1.2
        gfr = 142 * (creatinine / A) ** B * 0.9938**age
    #!Validation lines
    return f"GFR = {round(gfr, 2)} ml/min/1.73 m²"


def IBW(height: float, gender: str):
    # Convert height cm -> inches
    height /= 2.54
    ibw = 2.3 * (height - 60)
    if gender.lower() == "f":
        return ibw + 45.5
    elif gender.lower() == "m":
        return ibw + 50
    else:
        return "GAYYYYYYYYYY!"


def ABW(height: float, actual_weight: float, gender: str):
    ibw = IBW(height, gender)
    abw = ibw + 0.4 * (actual_weight - ibw)
    return abw


def BMI(weight: float, height: float):
    return f"{weight / height**2} kg/m²"


def is_obese(weight: float, height: float, gender: str):
    ibw = IBW(height, gender)
    return True if weight > ibw else False


def CrCl(creatinine: int, age: int, height: float, actual_weight: float, gender: str):
    creatinine /= 88.4
    abw = ABW(height, actual_weight, gender)
    crcl = ((140 - age) * abw) / (creatinine * 72)
    if gender.lower() == "f":
        return round(crcl * 0.85, 2)
    elif gender.lower() == "m":
        return round(crcl, 2)
    else:
        return "GAYYYYYYYYYY!"


# LMP calculation
def LMP(day, month, year):
    if month <= 3:
        new_month = month + 9
        new_year = year
    else:
        new_month = month - 3
        new_year = year + 1

    new_day = day + 7

    if new_day > 31:
        if new_month in [1, 3, 5, 7, 8, 10, 12]:
            new_day = new_day - 31
            new_month = new_month + 1
        else:
            new_day = new_day - 30
            new_month = new_month + 1
    return f"EDD = ({new_day}, {new_month}, {new_year})"


# ? Testing
# print(TSAT(150, 400, "f"))

# print(Mentz(80, 8))

# print(ESR(25, "f"))

# print(CRP(25, "f"))

# print(W_to_H(85, 1.6, "f"))

# print(GFR(40, 1.5, "f"))

# print(IBW(160, "f"))

# print(ABW(160, 70, "f"))

# print(BMI(80, 1.7))

# print(is_obese(70, 1.7, "f"))


# print(CrCl(1.1, 28, 160, 65, "f"))


# print(LMP(30, 10, 2025))
