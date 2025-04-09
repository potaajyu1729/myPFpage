// 現在の年を取得してフッターに表示
document.getElementById('current-year').textContent = new Date().getFullYear();

// ハンバーガーメニューの動作
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
    
    // ナビゲーションリンクをクリックしたらメニューを閉じる
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }
  
  // タイピングアニメーション
  const typingText = document.getElementById('typing-text');
  if (typingText) {
    const phrases = [
      "console.log('Hello, World!');",
      "function codeIsLife() { return true; }",
      "while(alive) { code(); learn(); repeat(); }",
      "if(coffee) { code(); } else { getCoffee(); }"
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        // 文字を削除
        typingText.innerHTML = currentPhrase.substring(0, charIndex - 1) + '<span class="typed-cursor">_</span>';
        charIndex--;
        typingSpeed = 50;
      } else {
        // 文字を追加
        typingText.innerHTML = currentPhrase.substring(0, charIndex + 1) + '<span class="typed-cursor">_</span>';
        charIndex++;
        typingSpeed = 100;
      }
      
      // 次のフレーズに移動するか、削除を開始するかの判定
      if (!isDeleting && charIndex === currentPhrase.length) {
        // 入力完了、少し待機してから削除開始
        isDeleting = true;
        typingSpeed = 1000; // 削除開始前の待機時間
      } else if (isDeleting && charIndex === 0) {
        // 削除完了、次のフレーズへ
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500; // 次のフレーズ開始前の待機時間
      }
      
      setTimeout(type, typingSpeed);
    }
    
    // タイピングアニメーション開始
    setTimeout(type, 1000);
  }
});

// マトリックスアニメーション
class MatrixAnimation {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.initialize();
    this.animate();
  }

  initialize() {
    // キャンバスのサイズをウィンドウに合わせる
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    // マトリックスの文字（0と1だけでなく、他のプログラミング記号も追加）
    this.characters = '01{}[]()<>!?+-*/=&|;:,.ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    this.fontSize = 12;
    this.columns = Math.floor(this.canvas.width / this.fontSize);
    
    // 各列の現在の位置を追跡する配列
    this.drops = [];
    for (let i = 0; i < this.columns; i++) {
      this.drops[i] = Math.floor(Math.random() * -100); // ランダムな開始位置
    }
  }

  resizeCanvas() {
    const footer = document.querySelector('footer');
    this.canvas.width = footer.offsetWidth;
    this.canvas.height = footer.offsetHeight;
    this.columns = Math.floor(this.canvas.width / this.fontSize);
    this.drops = [];
    for (let i = 0; i < this.columns; i++) {
      this.drops[i] = Math.floor(Math.random() * -100);
    }
  }

  animate() {
    // 半透明の黒で背景をクリア（残像効果）
    this.ctx.fillStyle = 'rgba(7, 11, 18, 0.05)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // 文字の色と設定
    this.ctx.font = `${this.fontSize}px monospace`;
    
    // 各列の文字を描画
    for (let i = 0; i < this.columns; i++) {
      // ランダムな文字を選択
      const char = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
      
      // 文字を描画
      this.ctx.fillStyle = '#00e676';
      this.ctx.fillText(
        char,
        i * this.fontSize,
        this.drops[i] * this.fontSize
      );
      
      // 一定の確率で文字の色を変える（アクセント）
      if (Math.random() > 0.99) {
        this.ctx.fillStyle = '#00b0ff';
        this.ctx.fillText(
          char,
          i * this.fontSize,
          this.drops[i] * this.fontSize
        );
      }
      
      // 文字が画面の下に到達したらリセット
      if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
        this.drops[i] = 0;
      }
      
      // 文字を下に移動
      this.drops[i]++;
    }
    
    // アニメーションを継続
    requestAnimationFrame(() => this.animate());
  }
}

// DOMが読み込まれた後にマトリックスアニメーションを初期化
document.addEventListener('DOMContentLoaded', () => {
  const matrixCanvas = document.getElementById('matrix-canvas');
  if (matrixCanvas) {
    new MatrixAnimation(matrixCanvas);
  }
});

// スキルバーのアニメーション
document.addEventListener('DOMContentLoaded', () => {
  const skillBars = document.querySelectorAll('.skill-bar > span');
  
  // IntersectionObserverを使用して、要素が表示されたときにアニメーションを開始
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 要素が表示されたらアニメーションのクラスを追加
        entry.target.style.transition = 'width 1.5s ease-in-out';
        observer.unobserve(entry.target); // 一度アニメーションが開始されたら監視を停止
      }
    });
  }, { threshold: 0.1 }); // 要素の10%が表示されたらトリガー
  
  // 各スキルバーを監視
  skillBars.forEach(bar => {
    // 初期状態では幅を0に設定
    const width = bar.style.width;
    bar.style.width = '0';
    
    // 少し遅延させてから監視を開始（ページ読み込み時のアニメーション用）
    setTimeout(() => {
      observer.observe(bar);
      setTimeout(() => {
        bar.style.width = width;
      }, 100);
    }, 500);
  });
});

// スクロール時のアニメーション
document.addEventListener('DOMContentLoaded', () => {
  // ヘッダーのスクロール効果
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.style.backgroundColor = 'rgba(7, 11, 18, 0.95)';
      navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
    } else {
      navbar.style.backgroundColor = 'rgba(10, 14, 23, 0.9)';
      navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    }
  });
  
  // スクロール時のフェードインアニメーション
  const fadeElements = document.querySelectorAll('.card, .project-card, .timeline-item');
  
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(element);
  });
});

// タブ切り替え機能を追加
document.addEventListener('DOMContentLoaded', () => {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // アクティブなタブボタンを更新
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // アクティブなタブコンテンツを更新
        const tabId = btn.getAttribute('data-tab');
        tabPanes.forEach(pane => {
          pane.classList.remove('active');
          if (pane.id === tabId) {
            pane.classList.add('active');
          }
        });
      });
    });
  }
});