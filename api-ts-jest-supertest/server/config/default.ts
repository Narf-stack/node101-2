// need one config file per environnement, this one is for default

export default {
  port: process.env.PORT || 5000,
  origin:"http://localhost:3000",
  dbUri: process.env.MONGO_URI || "",
  saltWorkFactor: parseInt(process.env.SALT_WORK_FACTOR) || 10,
  jwtPublic: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArwXXieDr4SH3ppGxz/cU
4vHyvxAT1UR6Cvvz78z+Ee9gL4lssTD71sPwsP6x75VdrgwouF3fEorrIjnwWcQj
mi7Zr/d/eGRs/s7dwNxAuO9ggAzcbhFbbKavzdHlyuWYvx9fP7stIQWOBL/pIJFv
088MCrnWpIN0FewVnNGsVQ1/zD8wGQhF91Koi0lkUugIIWEuYMTGcPZwb80NImn+
RojRnLf7gI0nNu+oOpU78imJllnG+5H8A1eplq6haShuSgUQBCmeGFzP5SmUCjFO
RN98mahs5CbjAJ1MxBHlKf2oxhSPdyVjBbvULAWTuMkzgFrzxpNNM+LsR7QcXqfJ
OwIDAQAB
-----END PUBLIC KEY-----`,
  jwtPrivate: `-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCvBdeJ4OvhIfem
kbHP9xTi8fK/EBPVRHoK+/PvzP4R72AviWyxMPvWw/Cw/rHvlV2uDCi4Xd8Siusi
OfBZxCOaLtmv9394ZGz+zt3A3EC472CADNxuEVtspq/N0eXK5Zi/H18/uy0hBY4E
v+kgkW/TzwwKudakg3QV7BWc0axVDX/MPzAZCEX3UqiLSWRS6AghYS5gxMZw9nBv
zQ0iaf5GiNGct/uAjSc276g6lTvyKYmWWcb7kfwDV6mWrqFpKG5KBRAEKZ4YXM/l
KZQKMU5E33yZqGzkJuMAnUzEEeUp/ajGFI93JWMFu9QsBZO4yTOAWvPGk00z4uxH
tBxep8k7AgMBAAECggEAAmqnu7kinwsR7GrCYRDUNbMwIV0IKqxiRpvzYpvBF4Ya
tpbrEvun3O+VERr3+2SW4XJvu3/16dkhZWl8Y2W2zu5+EsgHKnMXu2Fa1+QsQDSm
vFqxG0bB4IGt5Fi7sTrM8NKh+Fmaxjc/60Crga4dNHgwfkae0cp/RCNsdvjA+UzY
O44NkPbnwcx6jOQ2wfMo565v72+7IuHzweK+wcXYE1f/AljdTQLEnT1rtZC/4uhw
YLbyM+dR6O7ySHfaMDnTl1oAlvK+k3VbgdzjKDs5lq2RtjP5ySZiypp8pxuIM9jF
lSHqb46EMNgKv/j77CE6gpbFFrP7GHMKEY2lp6l3rQKBgQDtU2EXWAaTHmDKQjtv
sB32+31F386bUr+53GWqRz1Ibb8g2tEtODXjWYUO3FVQyPSTDJTDSyFy/nD1dTyN
76G3eu4Blb+lKp4+FQNkQwHCrOJeVNU1lXe8wqqwucCRH42duV41pr8bUQlp15ti
RToqgGHm1SBu6Ato8AH1V/W7RQKBgQC8y3OMiqs1b1OZCfLeJ7/WsDftEOJt76al
pbw+zx9mcGd6vSDCYRqTN5/pocpiszNMRXED5sdwiGhMIYU9sLA2F/8N76KL3knT
IUJi8z0s9h93OMbidQaVV2pKVtG8U0O0Kyc9FCsrAJdCH/up9vQMh/+0g9T63Gyg
dJqyhg16fwKBgD9tGDav7NnmtYF4n//idq+qWLmS7dmvDNR0ZatTbLptsjXqpRrL
ugMvypLFKfv0KQEfzKZA7wiXncLL+UoJsBOkQ/Wietx+flojLYvfKJpJsBn73Bt8
/cox0IJ4slFWuHddsiLulIaNatGhsMJbtAbl1sRlU0ywsVPzSOK0BlVtAoGAVnoO
lGqUH6a9sRTohS/J5InVJCaewOKL/8YZot92r5J/I65ryf12kcZh3j84l9sjfSU1
ribQZdBljbGw+V/sZuq47mY8mzqXsDjE0tQ9ylF2ekKsfuBBwrhGvIRmD5BIK8e0
cnrBhzH/Fs/Vk7XFddP5oXLdZIcAzsJ6dZmHpPsCgYA7PfIwo8HjEwy999RMkGuV
WW2FABcVG/glIAYE21OLWQ1ExoH5jUcJHHRDvIGBKC+n1OiFdT90nKrfvApt55C/
NON2RlAUnBcEeajlKBB7jpXf+HLR6WGHzhsRC9nuHC1Dhxb499eOtSC1F7QVHhof
qMFVnIOu8TAxme+6VmsfMQ==
-----END PRIVATE KEY-----`,
  accessTokenTtl: process.env.JWT_EXPIRES_IN || '15m',
  refreshTokenTtl: process.env.JWT_REFRESH_TOKEN_TTL || '1y',
}