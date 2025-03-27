import { LocationNode } from "../../data/locations";
import "./LocationTree.scss";

interface LocationTreeProps {
  data: LocationNode[];
  expandedNodes: Record<string, boolean>;
  toggleNode: (node: string) => void;
  handleSVGChange: (floors: string | string[]) => void;
  parentKey?: string;
}

export const LocationTree = ({
  data,
  expandedNodes,
  toggleNode,
  handleSVGChange,
  parentKey = "",
}: LocationTreeProps) => {
  return (
    <div>
      {data.map((node) => {
        const nodeKey = parentKey ? `${parentKey}.${node.id}` : node.id;
        const isExpanded = expandedNodes[nodeKey];

        return (
          <div key={nodeKey}>
            {!node.floorplan && (
              <div
                className="location-tree-node"
                onClick={() => toggleNode(nodeKey)}
                data-testid={`location-tree-node-${nodeKey}`}
              >
                <div className="location-tree-node-icon">
                  <span
                    className="icon-placeholder"
                    style={{
                      transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
                    }}
                  >
                    ▶
                  </span>
                  <strong className="node-name">{node.name}</strong>
                </div>
              </div>
            )}
            {isExpanded && node.children && (
              <div className="location-tree-node-children">
                <LocationTree
                  data={node.children}
                  expandedNodes={expandedNodes}
                  toggleNode={toggleNode}
                  handleSVGChange={handleSVGChange}
                  parentKey={nodeKey}
                />
              </div>
            )}
            {node.floorplan && (
              <div
                className="location-tree-child"
                data-testid={`location-tree-child-${node.floorplan}`}
                onClick={() =>
                  handleSVGChange(node.floorplan?.replace(".svg", "") ?? "")
                }
              >
                {node.name}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
