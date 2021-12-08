const PI02 = Math.PI * 0.5

export default {
  none:       (i, ii) => 1.0,
  in:         (i, ii) => i / ii,
  out:        (i, ii) => 1.0 - (i / ii),
  sin:        (i, ii) => Math.sin(i / ii * Math.PI),
  sinInv:     (i, ii) => 1.0 - Math.sin(i / ii * Math.PI),
  sinHalf:    (i, ii) => Math.sin(i / ii * PI02),
  sinHalfInv: (i, ii) => 1.0 - Math.sin(i / ii * PI02),
  cos:        (i, ii) => Math.cos(i / ii * Math.PI),
  cosInv:     (i, ii) => 1.0 - Math.cos(i / ii * Math.PI),
  cosHalf:    (i, ii) => Math.cos(i / ii * PI02),
  cosHalfInv: (i, ii) => 1.0 - Math.cos(i / ii * PI02),
  tan:        (i, ii) => Math.tan(i / ii * Math.PI),
  tanInv:     (i, ii) => 1.0 - Math.tan(i / ii * Math.PI),
}
