import { c, Props, template } from "atomico";
import customElements from "../custom-elements";

function icon({ type, color }: Props<typeof icon>) {
  const Icon = icons[type];
  return (
    <host shadowDom>
      <Icon cloneNode />
      <style>{`:host{--color: var(${color})}`}</style>
    </host>
  );
}

icon.props = {
  type: {
    type: String,
    reflect: true,
  },
  color: {
    type: String,
  },
};

export const icons = {
  component: template(
    <svg width="10" height="10" viewBox="0 0 10 10">
      <g transform="translate(-258.5 -73)">
        <g transform="translate(482.5 56)" fill="#fff" opacity="0.5">
          <path
            d="M -216.9999084472656 26.5 C -217.0003509521484 26.5 -217.0005493164062 26.49996948242188 -217.0005493164062 26.49996948242188 L -217.0004119873047 25.37987518310547 L -217.0004119873047 26.49959945678711 L -216.9999084472656 26.5 Z"
            stroke="none"
          />
          <path
            d="M -216.9999084472656 27 C -217.2761993408203 27 -217.5003051757812 26.77589988708496 -217.5003051757812 26.49959945678711 L -217.5003051757812 24.49979972839355 L -220.5 24.49979972839355 L -220.5 26.49959945678711 C -220.5 26.77589988708496 -220.7241058349609 27 -221.0004119873047 27 C -221.2758026123047 27 -221.4999084472656 26.77589988708496 -221.4999084472656 26.49959945678711 L -221.4999084472656 24.49979972839355 L -223.4997100830078 24.49979972839355 C -223.7760009765625 24.49979972839355 -224.0001068115234 24.27569961547852 -224.0001068115234 24.00029945373535 C -224.0001068115234 23.7239990234375 -223.7760009765625 23.49989891052246 -223.4997100830078 23.49989891052246 L -221.4999084472656 23.49989891052246 L -221.4999084472656 20.50020027160645 L -223.4997100830078 20.50020027160645 C -223.7760009765625 20.50020027160645 -224.0001068115234 20.27610015869141 -224.0001068115234 19.99979972839355 C -224.0001068115234 19.7234992980957 -223.7760009765625 19.50029945373535 -223.4997100830078 19.50029945373535 L -221.4999084472656 19.50029945373535 L -221.4999084472656 17.49959945678711 C -221.4999084472656 17.22419929504395 -221.2758026123047 17.00009918212891 -221.0004119873047 17.00009918212891 C -220.7241058349609 17.00009918212891 -220.5 17.22419929504395 -220.5 17.49959945678711 L -220.5 19.50029945373535 L -217.5003051757812 19.50029945373535 L -217.5003051757812 17.49959945678711 C -217.5003051757812 17.22419929504395 -217.2761993408203 17.00009918212891 -216.9999084472656 17.00009918212891 C -216.7236022949219 17.00009918212891 -216.5004119873047 17.22419929504395 -216.5004119873047 17.49959945678711 L -216.5004119873047 19.50029945373535 L -214.4997100830078 19.50029945373535 C -214.2243041992188 19.50029945373535 -214.0001983642578 19.7234992980957 -214.0001983642578 19.99979972839355 C -214.0001983642578 20.27610015869141 -214.2243041992188 20.50020027160645 -214.4997100830078 20.50020027160645 L -216.5004119873047 20.50020027160645 L -216.5004119873047 23.49989891052246 L -214.4997100830078 23.49989891052246 C -214.2243041992188 23.49989891052246 -214.0001983642578 23.7239990234375 -214.0001983642578 24.00029945373535 C -214.0001983642578 24.27569961547852 -214.2243041992188 24.49979972839355 -214.4997100830078 24.49979972839355 L -216.5004119873047 24.49979972839355 L -216.5004119873047 26.49959945678711 C -216.5004119873047 26.77589988708496 -216.7236022949219 27 -216.9999084472656 27 Z M -220.5 20.50020027160645 L -220.5 23.49989891052246 L -217.5003051757812 23.49989891052246 L -217.5003051757812 20.50020027160645 L -220.5 20.50020027160645 Z"
            stroke="none"
            fill="#000"
          />
        </g>
        <g
          transform="translate(261 75.5)"
          fill="none"
          stroke="#000"
          stroke-width="1"
        >
          <rect width="5" height="5" stroke="none" />
          <rect x="0.5" y="0.5" width="4" height="4" fill="none" />
        </g>
      </g>
    </svg>
  ),
  folder: template(
    <svg width="9.057" height="8.252" viewBox="0 0 9.057 8.252">
      <path
        d="M10.057,9.446a.806.806,0,0,1-.806.806H2.806A.806.806,0,0,1,2,9.446V3.806A.806.806,0,0,1,2.806,3H4.82l.806,1.209H9.252a.806.806,0,0,1,.806.806Z"
        transform="translate(-1.5 -2.5)"
        fill="none"
        stroke="#000"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1"
      />
    </svg>
  ),
  code: template(
    <svg width="13.536" height="8.071" viewBox="0 0 13.536 8.071">
      <path
        d="M-216.646,25.132a.5.5,0,0,1,0-.707l3.182-3.182-3.182-3.182a.5.5,0,0,1,0-.707.5.5,0,0,1,.706,0l3.536,3.535a.5.5,0,0,1,.146.354.5.5,0,0,1-.146.354l-3.536,3.535a.5.5,0,0,1-.353.146A.5.5,0,0,1-216.646,25.132Zm-5.465,0-3.535-3.535a.5.5,0,0,1-.146-.354.5.5,0,0,1,.146-.354l3.535-3.535a.5.5,0,0,1,.707,0,.5.5,0,0,1,0,.707l-3.182,3.182,3.182,3.182a.5.5,0,0,1,0,.707.5.5,0,0,1-.354.146A.5.5,0,0,1-222.111,25.132Z"
        transform="translate(225.793 -17.207)"
      />
    </svg>
  ),
};

export const Icon = c(icon);

customElements.define("icon", Icon);
