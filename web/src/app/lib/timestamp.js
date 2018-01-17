const timestamp = time => new Date(time)
  .toLocaleDateString('fr-FR', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit'
  });

export default timestamp;
