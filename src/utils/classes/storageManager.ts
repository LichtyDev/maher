export class StorageManager {
  static id: string;
  static storage: Record<string, any> = {};

  static init(id: string) {
    StorageManager.id = id;

    const jsonString = window.localStorage.getItem(`lodik-storage-${StorageManager.id}`);

    try {
      if (jsonString) {
        const json = JSON.parse(jsonString);

        if (typeof json === "object") {
          StorageManager.storage = { ...json };
        }
      }
    } catch (err) {
      // handle error
    }
  }

  static save(key: string, value: any) {
    StorageManager.storage[key] = value;

    window.localStorage.setItem(`lodik-storage-${StorageManager.id}`, JSON.stringify(StorageManager.storage));
  }

  static load(key: string) {
    return StorageManager.storage[key];
  }
}
