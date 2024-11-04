/* thermometer scrollbar code */
const updateScrollbarThumb = (colorString) => {
  const svgData = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="200" viewBox="0 0 20 200">
                            <rect x="1" y="1" width="18" height="198" fill="${colorString}" stroke="black" stroke-width="0"/>
                            ${Array.from({ length: 19 }, (_, i) => {
                              const y = 10 + i * 10;
                              return `<line x1="4" y1="${y}" x2="16" y2="${y}" stroke="black" stroke-width="0.5"/>`;
                            }).join("")}
                        </svg>`;
  const encodedData = `data:image/svg+xml;base64,${btoa(svgData)}`;
  document.querySelector(
    "style"
  ).innerHTML += `::-webkit-scrollbar-thumb { background: url('${encodedData}'); }`;
};
const smoothElement = document.querySelector(".smooth");
if (smoothElement) {
  const initialColorString = `rgb(0, 188, 212)`;
  updateScrollbarThumb(initialColorString);
  smoothElement.addEventListener("scroll", function () {
    const scrollTop = smoothElement.scrollTop;
    const docHeight = smoothElement.scrollHeight - smoothElement.clientHeight;
    const scrollFraction = scrollTop / docHeight;
    // Calculate color between cool (#00bcd4) to warm (#ff5722)
    const startColor = [0, 188, 212];
    const endColor = [255, 87, 34];
    const currentColor = startColor.map((start, index) => {
      return Math.round(start + (endColor[index] - start) * scrollFraction);
    });
    const colorString = `rgb(${currentColor[0]}, ${currentColor[1]}, ${currentColor[2]})`;
    updateScrollbarThumb(colorString);
  });
}
