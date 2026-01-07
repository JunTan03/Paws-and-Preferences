import { useEffect, useState, useRef } from "react";
import { fetchCats } from "./services/cataas";

function App() {
  const [cats, setCats] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedCats, setLikedCats] = useState([]);
  const [loading, setLoading] = useState(true);

  const startX = useRef(0);
  const [translateX, setTranslateX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const loadCats = async () => {
    setLoading(true);
    const data = await fetchCats(20);
    setCats(data);
    setCurrentIndex(0);
    setLikedCats([]);
    setLoading(false);
  };

  useEffect(() => { loadCats(); }, []);

  // Preload next image
  useEffect(() => {
    if (cats[currentIndex + 1]) {
      new Image().src = cats[currentIndex + 1].imageUrl;
    }
  }, [currentIndex, cats]);

  const handleStart = (e) => {
    startX.current = e.clientX;
    setIsSwiping(true);
  };

  const handleMove = (e) => {
    if (!isSwiping) return;
    const deltaX = e.clientX - startX.current;
    
    // Only move the card if the swipe is clearly horizontal (>20px)
    // This stops it from moving when just point up/down
    if (Math.abs(deltaX) > 20) {
      setTranslateX(deltaX);
    }
  };

  const handleEnd = (e) => {
    if (!isSwiping) return;

    if (Math.abs(translateX) > 50) {
      const direction = translateX > 0 ? "right" : "left";
      if (direction === "right") setLikedCats([...likedCats, cats[currentIndex]]);
      
      setTranslateX(direction === "right" ? 1000 : -1000);
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setTranslateX(0);
      }, 500);
    } else {
      setTranslateX(0);
    }
    setIsSwiping(false);
  };

  if (loading) return <div style={styles.screen}><h2>Loading...</h2></div>;

  if (currentIndex >= cats.length) {
    return (
      <div style={styles.summary}>
        <h1 style={styles.mainTitle}>Your Favorites</h1>
        <h2 style={styles.subTitle}>
          You liked {likedCats.length} cats out of {cats.length}!
        </h2>

        <div style={styles.grid}>
          {likedCats.map(c => <img key={c.id} src={c.imageUrl} style={styles.thumb} />)}
        </div>
        <button onClick={loadCats} style={styles.btn}>Restart</button>
      </div>
    );
  }

  return (
    <div style={styles.screen}>
      <h1 style={styles.mainTitle}>Paws & Preferences</h1>
      <p style={styles.subTitle}>Find Your Favourite Kitty</p>

      <div style={styles.cardStack}>
        <div 
          style={{
            ...styles.card,
            transform: `translateX(${translateX}px) rotate(${translateX / 15}deg)`,
            transition: isSwiping ? "none" : "all 0.3s ease"
          }}
          onPointerDown={handleStart} 
          onPointerMove={handleMove} 
          onPointerUp={handleEnd} 
          onPointerLeave={handleEnd}
        >
          {translateX > 60 && <div style={styles.likeTag}>LIKE</div>}
          {translateX < -60 && <div style={styles.nopeTag}>NOPE</div>}

          <img 
            key={currentIndex} 
            src={cats[currentIndex].imageUrl} 
            style={styles.img} 
            alt="cat" 
          />
        </div>
      </div>
      <p>Cat {currentIndex + 1} of {cats.length}</p>
    </div>
  );
}

const styles = {
  mainTitle: { fontSize: '2rem', margin: '0 0 5px 0', color: '#e25e5e',fontWeight: '800' },
  subTitle: { fontSize: '1rem', margin: '0 0 30px 0', color: '#9a6e6e', fontStyle: 'italic' },
  screen: { height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f7', overflow: 'hidden' },
  cardStack: { position: 'relative', width: 320, height: 450 },
  card: { position: 'absolute', width: '100%', height: '100%', borderRadius: 24, overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', backgroundColor: '#fff', cursor: 'grab' },
  img: { width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' },
  summary: { padding: 40, textAlign: 'center' },
  grid: { display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', margin: '20px 0' },
  thumb: { width: 100, height: 100, objectFit: 'cover', borderRadius: 12 },
  btn: { padding: '12px 24px', backgroundColor: '#e13757', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 'bold', cursor: 'pointer' },
  likeTag: { position: 'absolute', top: 20, left: 20, color: '#4CAF50', border: '4px solid #4CAF50', padding: '5px 10px', borderRadius: 8, fontWeight: 'bold', fontSize: 32, transform: 'rotate(-15deg)', zIndex: 20 },
  nopeTag: { position: 'absolute', top: 20, right: 20, color: '#F44336', border: '4px solid #F44336', padding: '5px 10px', borderRadius: 8, fontWeight: 'bold', fontSize: 32, transform: 'rotate(15deg)', zIndex: 20 }
};

export default App;