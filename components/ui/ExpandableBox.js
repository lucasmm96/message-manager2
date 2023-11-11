import FormInput from '@/components/ui/FormInput';
import styles from '@/components/ui/ExpandableBox.module.css';

function ExpandableBox(props) {
	const action = props.pendingMessage.action;
	const data = props.pendingMessage.data;
	
  return (
    <div className={styles.expandableContent}>
      {action === 'Update' ? (
        <form className={styles.form}>
          <div className={styles.column}>
            <div className={styles.fieldGroup}>
              <FormInput
                name="message_old"
                label="Message (Old)"
                type="text"
                disabled={true}
                value={data.old.message}
                onChangeHandler={() => {}}
                onBlurHandler={() => {}}
              />
              <FormInput
                name="author_old"
                label="Author (Old)"
                type="text"
                disabled={true}
                value={data.old.author}
                onChangeHandler={() => {}}
                onBlurHandler={() => {}}
              />
              <FormInput
                name="post_date_old"
                label="Post Date (Old)"
                type="date"
                disabled={true}
                value={data.old.postedAt.substr(0, 10)}
                onChangeHandler={() => {}}
                onBlurHandler={() => {}}
              />
              <FormInput
                name="post_link_old"
                label="Post Link (Old)"
                type="url"
                disabled={true}
                value={data.old.postUrl.post}
                onChangeHandler={() => {}}
                onBlurHandler={() => {}}
              />
              <FormInput
                name="story_old"
                label="Story Link (Old)"
                type="url"
                disabled={true}
                value={data.old.postUrl.story}
                onChangeHandler={() => {}}
                onBlurHandler={() => {}}
              />
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.fieldGroup}>
              <FormInput
                name="message_new"
                label="Message (New)"
                type="text"
                disabled={true}
                value={data.new.message}
                onChangeHandler={() => {}}
                onBlurHandler={() => {}}
              />
              <FormInput
                name="author_new"
                label="Author (New)"
                type="text"
                disabled={true}
                value={data.new.author}
                onChangeHandler={() => {}}
                onBlurHandler={() => {}}
              />
              <FormInput
                name="post_date_new"
                label="Post Date (New)"
                type="date"
                disabled={true}
                value={data.new.postedAt.substr(0, 10)}
                onChangeHandler={() => {}}
                onBlurHandler={() => {}}
              />
              <FormInput
                name="post_link_new"
                label="Post Link (New)"
                type="url"
                disabled={true}
                value={data.new?.postUrl?.post || ''}
                onChangeHandler={() => {}}
                onBlurHandler={() => {}}
              />
              <FormInput
                name="story_new"
                label="Story Link (New)"
                type="url"
                disabled={true}
                value={data.new?.postUrl?.story || ''}
                onChangeHandler={() => {}}
                onBlurHandler={() => {}}
              />
            </div>
          </div>
        </form>
      ) : (
        <form className={styles.form}>
          <div className={styles.column}>
            <div className={styles.fieldGroup}>
              <FormInput
                name="message"
                label="Message"
                type="text"
                disabled={true}
                value={data.message}
                onChangeHandler={() => {}}
                onBlurHandler={() => {}}
              />
              <FormInput
                name="author"
                label="Author"
                type="text"
                disabled={true}
                value={data.author}
                onChangeHandler={() => {}}
                onBlurHandler={() => {}}
              />
              <FormInput
                name="post_date"
                label="Post Date"
                type="date"
                disabled={true}
                value={data.postedAt.substr(0, 10)}
                onChangeHandler={() => {}}
                onBlurHandler={() => {}}
              />
              <FormInput
                name="post_link"
                label="Post Link"
                type="url"
                disabled={true}
                value={data.postUrl.post}
                onChangeHandler={() => {}}
                onBlurHandler={() => {}}
              />
              <FormInput
                name="story"
                label="Story Link"
                type="url"
                disabled={true}
                value={data.postUrl.story}
                onChangeHandler={() => {}}
                onBlurHandler={() => {}}
              />
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default ExpandableBox;
