type CommitActivityProps = {
  username: string;
  color?: string;
  className?: string;
};

export default function CommitActivity({
  username,
  color = "325E6A",
  className,
}: CommitActivityProps) {
  return (
    <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer">
    <img
      src={`https://ghchart.rshah.org/${color}/${username}`}
      alt={`${username}'s GitHub contribution chart`}
      className={className}
    />
    </a>
  );
}