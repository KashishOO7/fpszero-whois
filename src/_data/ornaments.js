module.exports = {
  dilation: {
    eq: "t₀ = t_f √(1 − 2GM / rc²)",
    note: "time runs slower where gravity is deeper",
    stars: [[18, 46, 1.8], [64, 22, 1.1], [104, 52, 2.3], [150, 30, 1.3],
            [196, 58, 1.6], [238, 26, 1.0], [280, 48, 1.4]],
    lines: "M18 46 L104 52 L196 58 M104 52 L150 30 L238 26",
  },

  rocket: {
    eq: "Δv = vₑ · ln(m₀ / m_f)",
    note: "what you can spend is what you brought",
    stars: [[24, 30, 1.4], [70, 56, 2.0], [118, 28, 1.2], [166, 50, 1.7],
            [214, 24, 1.1], [268, 44, 1.9]],
    lines: "M24 30 L70 56 L118 28 L166 50 L214 24 M166 50 L268 44",
  },

  luminosity: {
    eq: "L = 4πR² σT⁴",
    note: "a star's output, from its size and its heat",
    stars: [[30, 52, 2.1], [82, 24, 1.2], [128, 46, 1.5], [178, 20, 1.0],
            [222, 54, 1.8], [274, 32, 1.3]],
    lines: "M30 52 L128 46 L222 54 M128 46 L82 24 M178 20 L274 32",
  },

  horizon: {
    eq: "rₛ = 2GM / c²",
    note: "the radius past which nothing returns",
    stars: [[22, 26, 1.2], [76, 50, 1.9], [126, 22, 1.4], [180, 48, 2.2],
            [232, 28, 1.1], [278, 54, 1.6]],
    lines: "M22 26 L76 50 L126 22 M126 22 L180 48 L278 54 M180 48 L232 28",
  },

  wave: {
    eq: "iħ ∂ψ/∂t = Ĥψ",
    note: "how a state evolves, until it is observed",
    stars: [[28, 44, 1.6], [74, 20, 1.1], [120, 50, 2.0], [172, 26, 1.3],
            [226, 46, 1.5], [272, 22, 1.9]],
    lines: "M28 44 L120 50 L226 46 M120 50 L74 20 M172 26 L272 22",
  },
};
