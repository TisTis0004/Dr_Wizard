import time


# Glucose units
def Glucose_mg_to_mmol(mg):
    return round(mg / 18.0182, 2)


def Glucose_mmol_to_mg(mmol):
    return round(mmol * 18.0182, 2)


# Triglyceride units
def Triglyceride_mg_to_mmol(mg):
    return round(mg * 0.01129, 2)


def Triglyceride_mmol_to_mg(mmol):
    return round(mmol * 88.545, 2)


# Cholesterol units
def Cholesterol_mg_to_mmol(mg):
    return round(mg / 38.67, 2)


def Cholesterol_mmol_to_mg(mmol):
    return round(mmol * 38.67, 2)


# Calcium units
def Calcium_mg_to_mmol(mg):
    return round(mg * 0.2495, 2)


def Calcium_mmol_to_mg(mmol):
    return round(mmol / 0.2495, 2)


# Hgb1ac percentage to unit
def Hgb1ac_percent_to_unit(percent):
    return f"Hgb1ac = {28.7 * percent - 46.7} mg/dL"


# print(time.localtime())# gestational age: LMP - Today's date
