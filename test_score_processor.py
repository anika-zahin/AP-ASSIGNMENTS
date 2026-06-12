import pytest
from score_processor import ScoreProcessor


def test_successful_calculation(tmp_path):
    file_path = tmp_path / "score.txt"
    file_path.write_text("15")

    processor = ScoreProcessor()

    result = processor.process_score_file(str(file_path))

    assert result == 150


def test_missing_file():
    processor = ScoreProcessor()

    with pytest.raises(FileNotFoundError):
        processor.process_score_file("nonexistent_file.txt")
