function gmod(n, m) {
  return ((n % m) + m) % m;
}
export function hijriToGregorian(hYear, hMonth, hDay) {
  var jd =
    Math.floor((11 * hYear + 3) / 30) +
    354 * hYear +
    30 * hMonth -
    Math.floor((hMonth - 1) / 2) +
    hDay +
    1948440 -
    385;
  if (jd > 2299160) {
    var l = jd + 68569;
    var n = Math.floor((4 * l) / 146097);
    l = l - Math.floor((146097 * n + 3) / 4);
    var i = Math.floor((4000 * (l + 1)) / 1461001);
    l = l - Math.floor((1461 * i) / 4) + 31;
    var j = Math.floor((80 * l) / 2447);
    var d = l - Math.floor((2447 * j) / 80);
    l = Math.floor(j / 11);
    var m = j + 2 - 12 * l;
    var y = 100 * (n - 49) + i + l;
  } else {
    var j = jd + 1402;
    var k = Math.floor((j - 1) / 1461);
    var l = j - 1461 * k;
    var n = Math.floor((l - 1) / 365) - Math.floor(l / 1461);
    var i = l - 365 * n + 30;
    var j = Math.floor((80 * i) / 2447);
    var d = i - Math.floor((2447 * j) / 80);
    i = Math.floor(j / 11);
    var m = j + 2 - 12 * i;
    var y = 4 * k + n + i - 4716;
  }
  let date = new Date(y, m - 1, d);
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}
