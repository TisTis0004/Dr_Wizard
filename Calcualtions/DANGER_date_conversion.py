import math
from datetime import datetime, timedelta

def gmod(n, m):
    return ((n % m) + m) % m

def kuwaiticalendar(g_year, g_month, g_day):
    adjust = 0
    today = datetime(g_year, g_month, g_day)
    day = today.day
    month = today.month
    year = today.year
    m = month
    y = year

    if m < 3:
        y -= 1
        m += 12

    a = math.floor(y / 100.0)
    b = 2 - a + math.floor(a / 4.0)

    if y < 1583:
        b = 0
    if y == 1582:
        if m > 10:
            b = -10
        if m == 10 and day > 4:
            b = -10

    jd = math.floor(365.25 * (y + 4716)) + math.floor(30.6001 * (m + 1)) + day + b - 1524
    b = 0

    if jd > 2299160:
        a = math.floor((jd - 1867216.25) / 36524.25)
        b = 1 + a - math.floor(a / 4.0)

    bb = jd + b + 1524
    cc = math.floor((bb - 122.1) / 365.25)
    dd = math.floor(365.25 * cc)
    ee = math.floor((bb - dd) / 30.6001)

    day = int(bb - dd - math.floor(30.6001 * ee))
    month = int(ee - 1)
    if ee > 13:
        cc += 1
        month = ee - 13

    year = int(cc - 4716)

    iyear = 10631.0 / 30.0
    epochastro = 1948084
    shift1 = 8.01 / 60.0

    z = jd - epochastro
    cyc = math.floor(z / 10631.0)
    z = z - 10631 * cyc
    j = math.floor((z - shift1) / iyear)
    iy = 30 * cyc + j
    z = z - math.floor(j * iyear + shift1)
    im = math.floor((z + 28.5001) / 29.5)

    if im == 13:
        im = 12

    id = int(z - math.floor(29.5001 * im - 29))

    return [day, month, year, jd - 1, gmod(jd + 1 - adjust, 7) + 1, id, im - 1, iy]

def hijri_to_gregorian(h_year, h_month, h_day):
    jd = math.floor((11 * h_year + 3) / 30) + 354 * h_year + 30 * h_month - math.floor((h_month - 1) / 2) + h_day + 1948440 - 385
    if jd > 2299160:
        l = jd + 68569
        n = math.floor((4 * l) / 146097)
        l = l - math.floor((146097 * n + 3) / 4)
        i = math.floor((4000 * (l + 1)) / 1461001)
        l = l - math.floor((1461 * i) / 4) + 31
        j = math.floor((80 * l) / 2447)
        d = l - math.floor((2447 * j) / 80)
        l = math.floor(j / 11)
        m = j + 2 - 12 * l
        y = 100 * (n - 49) + i + l
    else:
        j = jd + 1402
        k = math.floor((j - 1) / 1461)
        l = j - 1461 * k
        n = math.floor((l - 1) / 365) - math.floor(l / 1461)
        i = l - 365 * n + 30
        j = math.floor((80 * i) / 2447)
        d = i - math.floor((2447 * j) / 80)
        i = math.floor(j / 11)
        m = j + 2 - 12 * i
        y = 4 * k + n + i - 4716

    return datetime(y, m, d)

def gregorian_to_shamsi(g_year, g_month, g_day):
    g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]
    jy = 979 if g_year > 1600 else 0
    g_year -= 1600 if g_year > 1600 else 621
    gy2 = g_year + 1 if g_month > 2 else g_year
    days = 365 * g_year + math.floor((gy2 + 3) / 4) - math.floor((gy2 + 99) / 100) + math.floor((gy2 + 399) / 400) + g_day + g_d_m[g_month - 1] - 80
    jy += 33 * math.floor(days / 12053)
    days %= 12053
    jy += 4 * math.floor(days / 1461)
    days %= 1461
    if days > 365:
        jy += math.floor((days - 1) / 365)
        days = (days - 1) % 365

    jm = 1 + math.floor(days / 31) if days < 186 else 7 + math.floor((days - 186) / 30)
    jd = 1 + (days % 31 if days < 186 else (days - 186) % 30)
    return jy, jm, jd

def shamsi_to_gregorian(jy, jm, jd):
    sal_a = [0, 31, 30 if jy % 4 == 3 else 29, 31, 30, 31, 30, 31, 30, 31, 30, 29]
    jy += 1595
    days = -355668 + 365 * jy + (jy // 33) * 8 + ((jy % 33) + 3) // 4 + jd + sum(sal_a[:jm])
    gy = 400 * (days // 146097)
    days %= 146097

    if days > 36524:
        gy += 100 * ((days - 1) // 36524)
        days = (days - 1) % 36524
        if days >= 365:
            days += 1

    gy += 4 * (days // 1461)
    days %= 1461

    if days > 365:
        gy += (days - 1) // 365
        days = (days - 1) % 365

    gd = days + 1
    gm = 0
    for gm, v in enumerate([31, 29 if gy % 4 == 0 and gy % 100 != 0 or gy % 400 == 0 else 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], 1):
        if gd <= v:
            break
        gd -= v

    return gy, gm, gd
