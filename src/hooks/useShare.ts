import * as htmlToImage from "html-to-image";

export async function shareElement(el: HTMLElement, name="tierone-share.png") {
  try {
    const dataUrl = await htmlToImage.toPng(el, { pixelRatio: 2, cacheBust: true });
    const blob = await (await fetch(dataUrl)).blob();
    const file = new File([blob], name, { type: "image/png" });
    
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({ 
        files: [file], 
        title: "My TierOne", 
        text: "My TierScore progress on TierOne" 
      });
    } else {
      const a = document.createElement("a"); 
      a.href = dataUrl; 
      a.download = name; 
      a.click();
    }
  } catch (error) {
    console.error('Share failed:', error);
  }
}