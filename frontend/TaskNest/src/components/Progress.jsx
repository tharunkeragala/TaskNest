const Progress = ({ progress = 0, status }) => {
  const getColor = () => {
    switch (status) {
      case 'In Progress':
        return 'bg-cyan-500 border border-cyan-500/10'
      case 'Completed':
        return 'bg-indigo-500 border border-indigo-500/10'
      case 'Pending':
        return 'bg-violet-500 border border-violet-500/10'
      default:
        return 'bg-gray-400'
    }
  }

  const safeProgress = Math.min(Math.max(progress, 0), 100)

  return (
    <div className="w-full bg-gray-200 rounded-full h-1.5">
      <div
        className={`${getColor()} h-1.5 rounded-full transition-all`}
        style={{ width: `${safeProgress}%` }}
        role="progressbar"
        aria-valuenow={safeProgress}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  )
}

export default Progress
