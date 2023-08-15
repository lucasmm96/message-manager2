import FormInput from '@/components/ui/FormInput';
import styles from '@/components/ui/ExpandableBox.module.css';

function ExpandableBox(props) {
  return (
    <div>
      <div className={styles.expandableContent}>
        {props.action === 'Update' ? (
          <form className={styles.form}>
            <div className={styles.column}>
              <div className={styles.fieldGroup}>
                <FormInput label="Message (Old)" type="text" disabled />
                <FormInput label="Author (Old)" type="text" disabled />
                <FormInput label="Post Date (Old)" type="date" disabled />
                <FormInput label="Post Link (Old)" type="url" disabled />
                <FormInput label="Story Link (Old)" type="url" disabled />
              </div>
            </div>
            <div className={styles.column}>
              <div className={styles.fieldGroup}>
                <FormInput label="Message (New)" type="text" disabled />
                <FormInput label="Author (New)" type="text" disabled />
                <FormInput label="Post Date (New)" type="date" disabled />
                <FormInput label="Post Link (New)" type="url" disabled />
                <FormInput label="Story Link (New)" type="url" disabled />
              </div>
            </div>
          </form>
        ) : (
          <form>
            <FormInput label="Message" type="text" disabled />
            <FormInput label="Author" type="text" disabled />
            <FormInput label="Post Date" type="date" disabled />
            <FormInput label="Post Link" type="url" disabled />
            <FormInput label="Story Link" type="url" disabled />
          </form>
        )}
      </div>
    </div>
  );
}

export default ExpandableBox;
