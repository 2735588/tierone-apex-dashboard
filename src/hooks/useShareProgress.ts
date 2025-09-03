import * as htmlToImage from "html-to-image";

export async function shareElementAsImage(el: HTMLElement, fileName="tierone-progress.png") {
  try {
    const dataUrl = await htmlToImage.toPng(el, { pixelRatio: 2, cacheBust: true });
    const blob = await (await fetch(dataUrl)).blob();
    const file = new File([blob], fileName, { type: "image/png" });
    
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({ 
        files: [file], 
        title: "My TierOne Progress", 
        text: "Tracking my journey on TierOne." 
      });
    } else {
      const a = document.createElement("a"); 
      a.href = dataUrl; 
      a.download = fileName; 
      a.click();
    }
  } catch (error) {
    console.error('Share failed:', error);
  }
}