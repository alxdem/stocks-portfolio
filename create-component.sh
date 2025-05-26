#!/bin/bash

echo "Select the type:"
select type in atoms molecules organisms; do
  if [[ -n "$type" ]]; then
    break
  else
    echo "Wrong choose. Repeat."
  fi
done

read -p "Name of the component: " name

dir="src/components/$type/$name"

mkdir -p "$dir"
cat <<EOF > "$dir/$name.tsx"
import type { ${name}Props } from '@$type/$name/$name.props';
import styles from '@$type/$name/$name.module.css';

const $name = () => {
  return <>$name</>;
};

export default $name;
EOF

touch "$dir/$name.module.css"

cat <<EOF > "$dir/$name.props.ts"
export interface ${name}Props {

}
EOF

echo "Created the component: src/components/$type/$name"