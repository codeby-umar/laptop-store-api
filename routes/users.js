router.post('/', async (req, res) => {
  try {
    // 1. Validation
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // 2. User bor-yo‘qligini tekshirish
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send("User already exists");
    }

    // 3. Yangi user yaratish
    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    // 4. Saqlash
    await user.save();

    // 5. Response
    res.status(201).send({
      message: "User created",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      }
    });

  } catch (err) {
    res.status(500).send("Server error");
  }
});