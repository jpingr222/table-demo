interface TableHead {
  id: string;
  name: string;
}

interface TableData {
  headId: string;
  data: string;
}

interface TableBody {
  id: number;
  content: TableData[];
}

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
