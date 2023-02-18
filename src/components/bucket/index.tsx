import { useState, useContext } from "react";
import { Modal, Button } from "antd";
import { BucketContext } from "@/context/bucket";

type StoreModalProps = {
  visible: boolean;
  onClose: () => void;
};

const BucketModal = ({ visible, onClose }: StoreModalProps) => {
  const bucketContext = useContext<any>(BucketContext)
  const handleOk = () => {
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const fetchStoreItems = async () => {
    
  };

  return (
    <Modal
      title="Store Bucket"
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose={true}
      width={800}
    >
      {bucketContext.bucket.map((item:any) => (
        <div key={item.id}>
          <p>product: {item.name} price: {item.price}</p>
          {}
        </div>
      ))}
      <Button >Buy</Button>
      
    </Modal>
  );
};

export default BucketModal;
