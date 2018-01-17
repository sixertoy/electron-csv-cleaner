const timestamp = (time, short = false) => new Date(time)
  .toLocaleDateString('fr-FR', short ? {} : {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit'
  });

export default timestamp;
