# Natours Application

Built using modern technologies: node.js, express, mongoDb, mongoose and friends 😘

https://lyx-f-p.onrender.com  
(Please access this website from pc, it performs very sadly on mobile devices.😢)

安全机制

jwt cookie 创建账号和登录账号时会创建一个包含着 jwt 的 cookie 发送给 client 作为通行证，登出时就发送一个同名的 cookie 顶掉之前的。
