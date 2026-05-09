import img1 from './assets/fotos/whatsapp_image_1.jpeg';
import img2 from './assets/fotos/1cf48680-d930-4760-8886-be38274d87c4.png';
import img3 from './assets/fotos/captura_110557.png';
import img4 from './assets/fotos/captura_110649.png';
import img5 from './assets/fotos/captura_110649_1.png';
import img6 from './assets/fotos/captura_110733.png';
import img7 from './assets/fotos/captura_110755.png';
import img8 from './assets/fotos/captura_110821.png';
import img9 from './assets/fotos/captura_110848.png';
import img10 from './assets/fotos/captura_110949.png';
import img11 from './assets/fotos/logo_mgx3d.png';

const imageMap: Record<string, string> = {
  '1cf48680-d930-4760-8886-be38274d87c4.png': img2,
  'captura_110557.png': img3,
  'Captura de tela 2026-05-09 110557.png': img3,
  'captura_110649.png': img4,
  'Captura de tela 2026-05-09 110649.png': img4,
  'captura_110649_1.png': img5,
  'Captura de tela 2026-05-09 110649-1.png': img5,
  'captura_110733.png': img6,
  'Captura de tela 2026-05-09 110733.png': img6,
  'captura_110755.png': img7,
  'Captura de tela 2026-05-09 110755.png': img7,
  'captura_110821.png': img8,
  'Captura de tela 2026-05-09 110821.png': img8,
  'captura_110848.png': img9,
  'Captura de tela 2026-05-09 110848.png': img9,
  'captura_110949.png': img10,
  'Captura de tela 2026-05-09 110949.png': img10,
  'whatsapp_image_1.jpeg': img1,
  'WhatsApp Image 2026-05-09 at 11.01.34.jpeg': img1,
  'logo_mgx3d.png': img11,
  'logo mgx3d.png': img11,
};

export const getImageUrl = (url: string) => {
  if (!url) return '';
  if (url.startsWith('http') || url.startsWith('data:')) return url;
  
  try {
    const decodedUrl = decodeURIComponent(url);
    for (const [key, value] of Object.entries(imageMap)) {
      if (decodedUrl.includes(key)) {
        return value;
      }
    }
  } catch (e) {
    // ignore decode error
  }
  
  for (const [key, value] of Object.entries(imageMap)) {
    if (url.includes(key)) {
      return value;
    }
  }

  return url;
};

export const defaultImages = {
  img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, logo: img11
};
