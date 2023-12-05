import { c, css } from "atomico";
import { tokensColor } from "../tokens";

function pattern() {
  return (
    <host shadowDom>
      <div class="layer">
        <div class="gradient"></div>
      </div>
    </host>
  );
}

pattern.props = {
  absolute: { type: Boolean, reflect: true },
  theme: {
    type: String,
    reflect: true,
    value: "boxes" as
      | "boxes"
      | "wavy"
      | "zigzag"
      | "zigzag3d"
      | "zigzag3d"
      | "polka2",
  },
};

pattern.styles = [
  tokensColor,
  css`
    :host {
      --position: relative;
      width: 100%;
      height: 100%;
      position: var(--position);
      perspective: 300px;
      top: 0;
      left: 0;
      overflow: hidden;
    }
    :host([absolute]) {
      --position: absolute;
    }
    .layer {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      bottom: 0;
      transform: rotate3d(1, 0, 0, 45deg);
    }
    :host([theme="boxes"]) .layer {
      background-image: linear-gradient(
          var(--color-primary-frame) 1px,
          transparent 1px
        ),
        linear-gradient(
          to right,
          var(--color-primary-frame) 1px,
          var(--color-container) 1px
        );
      background-size: 20px 20px;
    }
    :host([theme="wavy"]) .layer {
      background-image: repeating-radial-gradient(
          circle at 50% 100%,
          transparent 0,
          var(--color-container) 10px
        ),
        repeating-linear-gradient(
          var(--color-primary-frame),
          var(--color-primary-active)
        );
    }
    :host([theme="zigzag"]) .layer {
      background-color: var(--color-container);
      background-image: linear-gradient(
          135deg,
          var(--color-primary-frame) 25%,
          transparent 25%
        ),
        linear-gradient(225deg, var(--color-primary-frame) 25%, transparent 25%),
        linear-gradient(45deg, var(--color-primary-frame) 25%, transparent 25%),
        linear-gradient(
          315deg,
          var(--color-primary-frame) 25%,
          var(--color-container) 25%
        );
      background-position: 10px 0, 10px 0, 0 0, 0 0;
      background-size: 20px 20px;
      background-repeat: repeat;
    }
    :host([theme="zigzag3d"]) .layer {
      background-color: var(--color-container);
      background: linear-gradient(
            135deg,
            var(--color-primary-active) 25%,
            transparent 25%
          ) -10px 0/ 20px 20px,
        linear-gradient(225deg, var(--color-primary-frame) 25%, transparent 25%) -10px
          0/ 20px 20px,
        linear-gradient(
            315deg,
            var(--color-primary-active) 25%,
            transparent 25%
          )
          0px 0/ 20px 20px,
        linear-gradient(
            45deg,
            var(--color-primary-frame) 25%,
            var(--color-container) 25%
          )
          0px 0/ 20px 20px;
    }
    :host([theme="polka2"]) .layer {
      background-color: var(--color-container);
      background-image: radial-gradient(
          var(--color-primary-frame) 0.75px,
          transparent 0.75px
        ),
        radial-gradient(
          var(--color-primary-frame) 0.75px,
          var(--color-container) 0.75px
        );
      background-size: 30px 30px;
      background-position: 0 0, 15px 15px;
    }
    .gradient {
      width: 100%;
      height: 100%;
      background-image: radial-gradient(
        farthest-side at 50% 100%,
        transparent 0%,
        var(--color-container) 100%
      );
    }
  `,
];

export const Pattern = c(pattern);
