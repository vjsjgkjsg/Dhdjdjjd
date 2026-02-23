// МЕТОДИЧЕСКАЯ КОПИЛКА - СКРИПТЫ

// Функция для разворачивания/сворачивания конспекта
function toggleLesson(button) {
  const card = button.closest('.lesson-card');
  const content = card.querySelector('.lesson-content');
  const isExpanded = button.classList.contains('expanded');
  
  if (isExpanded) {
    // Сворачиваем
    content.classList.remove('show');
    button.classList.remove('expanded');
    button.querySelector('span:first-child').textContent = 'Развернуть конспект';
  } else {
    // Разворачиваем
    content.classList.add('show');
    button.classList.add('expanded');
    button.querySelector('span:first-child').textContent = 'Свернуть конспект';
    
    // Плавная прокрутка к началу карточки
    setTimeout(() => {
      card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }
}

// Фильтрация по возрасту
document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const lessonCards = document.querySelectorAll('.lesson-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Убираем активный класс у всех кнопок
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Добавляем активный класс к нажатой кнопке
      button.classList.add('active');
      
      const filterAge = button.getAttribute('data-age');
      
      // Фильтруем карточки
      lessonCards.forEach(card => {
        const cardAge = card.getAttribute('data-age');
        
        if (filterAge === 'all' || cardAge === filterAge) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.5s ease-out';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
  
  // Обработчики для кнопок скачивания
  const downloadButtons = document.querySelectorAll('.btn-download, .btn-secondary');
  
  downloadButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Показываем уведомление (toast)
      const buttonText = button.textContent.trim();
      showToast(`${buttonText} — функция в разработке`);
    });
  });
});

// Функция показа уведомления
function showToast(message) {
  // Создаём элемент toast
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  
  // Стили toast
  toast.style.position = 'fixed';
  toast.style.bottom = '24px';
  toast.style.right = '24px';
  toast.style.background = 'linear-gradient(135deg, #1e40af, #7c3aed)';
  toast.style.color = 'white';
  toast.style.padding = '16px 24px';
  toast.style.borderRadius = '12px';
  toast.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)';
  toast.style.zIndex = '9999';
  toast.style.fontWeight = '700';
  toast.style.fontSize = '0.95rem';
  toast.style.animation = 'slideInUp 0.3s ease-out';
  
  document.body.appendChild(toast);
  
  // Убираем через 3 секунды
  setTimeout(() => {
    toast.style.animation = 'slideOutDown 0.3s ease-out';
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
}

// Добавляем анимации в стили
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(100px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideOutDown {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(100px);
    }
  }
`;
document.head.appendChild(style);

// Счётчик конспектов
const totalLessons = document.querySelectorAll('.lesson-card').length;
console.log(`📚 Загружено конспектов: ${totalLessons}`);
