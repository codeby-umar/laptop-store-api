# 💻 Laptop Store RESTful API

![API Banner](https://socialify.git.ci/your-username/laptop-store-api/image?description=Robust%20e-commerce%20backend%20for%20modern%20laptop%20retailers&font=Inter&name=1&owner=1&pattern=Circuit%20Board&theme=Dark)

---

## 🚀 Loyiha Haqida

Ushbu loyiha zamonaviy noutbuklar do'koni uchun mo'ljallangan backend tizimi bo'lib, mahsulotlarni boshqarish, foydalanuvchi savatchasi va buyurtmalar tizimini to'liq qamrab oladi. Loyiha **Clean Architecture** va **REST** prinsiplari asosida qurilgan.

---

## 🛠 Texnologiyalar

* **Runtime:** Node.js (v18+)
* **Framework:** Express.js
* **Database:** MongoDB (Mongoose ODM)
* **Auth:** JSON Web Tokens (JWT) & bcrypt.js
* **Validation:** Joi yoki Zod
* **Documentation:** Swagger UI (ixtiyoriy)

---

## 📂 Loyiha Strukturasi

Loyiha tartibli va kengayishga qulay qilib tuzilgan:

```text
laptop-store-api/
├── src/
│   ├── controllers/    # API mantiqi (Request/Response)
│   ├── models/         # Ma'lumotlar bazasi sxemalari
│   ├── routes/         # API manzillari (Endpoints)
│   ├── middleware/     # Auth va Xatolarni ushlash
│   ├── config/         # DB va Atrof-muhit sozlamalari
│   └── app.js          # Asosiy kirish nuqtasi
├── assets/             # Loyiha rasmlari (diagrammalar)
├── .env                # Maxfiy kalitlar
└── package.json
