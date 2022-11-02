import { TableHead, TableBody } from "../../types";

export default ({ head, body }: { head: TableHead[], body: TableBody[]}) => {
  const thead = (
    <tr>
      <th scope="col"></th>
      {head.map(({ id, name }) => {
        return <th key={id} scope="col">{name}</th>;
      })}
    </tr>
  );

  const tbody = body.map(({ id, content }) => {
    return (
      <tr key={id}>
        <th scope="row">{id}</th>
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
