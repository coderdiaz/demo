import { useMemo, useState } from "react";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import { XIcon } from 'lucide-react';
import styles from './Example.module.css';

const Item = ({ id, title, subtitle, ...props }) => (
  <motion.div className={styles.item} key={id} layoutId={id} {...props}>
    <span>{subtitle}</span>
    <h2>{title}</h2>
  </motion.div>
);

export default function Example() {
  const [selectedId, setSelectedId] = useState(null);

  const items = useMemo(
    () => [
      { id: 1, title: "Title 1", subtitle: "Subtitle 1" },
      { id: 2, title: "Title 2", subtitle: "Subtitle 2" },
      { id: 3, title: "Title 3", subtitle: "Subtitle 3" },
      { id: 4, title: "Title 4", subtitle: "Subtitle 4" },
    ],
    []
  );

  return (
    <LayoutGroup>
      <ul className={styles.gallery}>
        {items.map((item) => (
          <Item {...item} onClick={() => setSelectedId(item.id)} />
        ))}
      </ul>
      <AnimatePresence>
        {selectedId && (
          <motion.div className={styles.modalContainer} key="modal">
            <motion.div className={styles.modal} layoutId={selectedId}>
              Hello World
              <motion.button
                className={styles.close}
                onClick={() => setSelectedId(null)}
              >
                <XIcon />
              </motion.button>
            </motion.div>
            <motion.div
              key="backdrop"
              className={styles.backdrop}
              onClick={() => setSelectedId(null)}
              variants={{
                hidden: {
                  opacity: 0,
                  transition: {
                    duration: 0.16,
                  },
                },
                visible: {
                  opacity: 0.8,
                  transition: {
                    delay: 0.04,
                    duration: 0.2,
                  },
                },
              }}
              initial="hidden"
              exit="hidden"
              animate="visible"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}
