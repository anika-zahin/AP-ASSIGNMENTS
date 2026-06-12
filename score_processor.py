class ScoreProcessor:
    def process_score_file(self, file_path: str) -> int:
        file = None

        try:
            file = open(file_path, "r")
            content = file.read().strip()
            score = int(content)
            result = score * 10

        except FileNotFoundError:
            print("Error: File not found")
            raise

        except ValueError:
            print("Error: Invalid data format")
            raise

        else:
            print("Data processed successfully")
            return result

        finally:
            if file is not None:
                file.close()
            print("File cleanup completed")
