'use client';

type TreeNode = {
  name: string;
  path: string;
  type: 'file' | 'folder';
  fileId?: string;
  children?: TreeNode[];
};

export function FileTree({
  nodes,
  onSelectFile,
}: {
  nodes: TreeNode[];
  onSelectFile: (fileId: string) => void;
}) {
  const renderNode = (node: TreeNode, depth = 0) => {
    if (node.type === 'file') {
      return (
        <button
          key={node.path}
          onClick={() => node.fileId && onSelectFile(node.fileId)}
          className="block w-full text-left py-1"
          style={{ paddingLeft: depth * 16 }}
        >
          {node.name}
        </button>
      );
    }

    return (
      <div key={node.path}>
        <div className="py-1 font-medium" style={{ paddingLeft: depth * 16 }}>
          {node.name}
        </div>
        {node.children?.map((child) => renderNode(child, depth + 1))}
      </div>
    );
  };

  return <div className="rounded border p-4">{nodes.map((node) => renderNode(node))}</div>;
}