
export enum Status {
  Unknown,
  Miss,
  Hit,
  Killed,
}

type CellProps = {
  onClick: (row: number, col: number) => void,
  col: number,
  row: number,
  status: Status
}

export const Cell = (props: CellProps) => {
  return <td onClick={()=>props.onClick(props.row, props.col)}>{props.status}</td>
}
