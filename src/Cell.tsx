export enum Status {
  Unknown,
  Miss,
  Hit,
  Killed,
}

type CellProps = {
  active: boolean
  onClick: (row: number, col: number) => void
  col: number
  row: number
  status: Status
}

const content: { [key: number]: string } = {
  [Status.Killed]: '☠️',
  [Status.Hit]: '🔥',
  [Status.Miss]: '⊙',
}

export const Cell = (props: CellProps) => {
  let className = ''
  let fire = () => {}

  if (props.active) {
    className = 'active'
    fire = () => props.onClick(props.row, props.col)
  }

  return (
    <td className={className} onClick={fire}>
      {content[props.status]}
    </td>
  )
}
