import { TableHead, TableBody } from "../../types/Table";

export default ({ head, body }: { head: TableHead[], body: TableBody[]}) => {
  const thead = (
    <tr>
      <th></th>
      {head.map(({ id, name }) => {
        return <th key={id}>{name}</th>;
      })}
    </tr>
  );

  const tbody = body.map(({ id, content }) => {
    return (
      <tr key={id}>
        <th>{id}</th>
        {content.map(({headId, data}) => {
          return <td key={headId}>{data}</td>
        })}
      </tr>
    );
  });

  return (
    <table>
      <thead>{thead}</thead>
      <tbody>{tbody}</tbody>
    </table>
  );
};
