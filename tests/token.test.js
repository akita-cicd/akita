var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { extractClaims } from '../src/token';
const expiredToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImVCWl9jbjNzWFlBZDBjaDRUSEJLSElnT3dPRSIsImtpZCI6Ijc4MTY3RjcyN0RFQzVEODAxREQxQzg3ODRDNzA0QTFDODgwRUMwRTEifQ.eyJqdGkiOiIzYjFmOGIwYS1jOTkyLTRjZTktYmQxNy1lNWQwMTlhNDE5MjciLCJzdWIiOiJyZXBvOm10aGJlcm5hcmRlcy9hY3Rpb25zLXRlc3Q6cmVmOnJlZnMvaGVhZHMvbWFpbiIsImF1ZCI6Im82cyIsInJlZiI6InJlZnMvaGVhZHMvbWFpbiIsInNoYSI6ImNkYThmNGJiN2ZmNjg5NjJmODMxNjczYzU1NDc5ZjUzNjcwM2MzOTEiLCJyZXBvc2l0b3J5IjoibXRoYmVybmFyZGVzL2FjdGlvbnMtdGVzdCIsInJlcG9zaXRvcnlfb3duZXIiOiJtdGhiZXJuYXJkZXMiLCJyZXBvc2l0b3J5X293bmVyX2lkIjoiMTI2NDg5MjQiLCJydW5faWQiOiIyNzIyMjM2NjU5IiwicnVuX251bWJlciI6IjE4IiwicnVuX2F0dGVtcHQiOiIxIiwicmVwb3NpdG9yeV92aXNpYmlsaXR5IjoicHJpdmF0ZSIsInJlcG9zaXRvcnlfaWQiOiI1MTYxOTE1MjkiLCJhY3Rvcl9pZCI6IjEyNjQ4OTI0IiwiYWN0b3IiOiJtdGhiZXJuYXJkZXMiLCJ3b3JrZmxvdyI6ImdlbmVyYXRlLXRva2VuIiwiaGVhZF9yZWYiOiIiLCJiYXNlX3JlZiI6IiIsImV2ZW50X25hbWUiOiJ3b3JrZmxvd19kaXNwYXRjaCIsInJlZl90eXBlIjoiYnJhbmNoIiwiam9iX3dvcmtmbG93X3JlZiI6Im10aGJlcm5hcmRlcy9hY3Rpb25zLXRlc3QvLmdpdGh1Yi93b3JrZmxvd3MvZ2VuZXJhdGUtdG9rZW4ueW1sQHJlZnMvaGVhZHMvbWFpbiIsImlzcyI6Imh0dHBzOi8vdG9rZW4uYWN0aW9ucy5naXRodWJ1c2VyY29udGVudC5jb20iLCJuYmYiOjE2NTg1NDQ3MjQsImV4cCI6MTY1ODU0NTYyNCwiaWF0IjoxNjU4NTQ1MzI0fQ.bK_vOAwbUZ_zoqCRh2OE9GNLihp_ZQfqHgzqG8r-ZrcUa7T-Hdlzi7rhmmGQSfIVbFBonSqFK4QuE3n4qvhutijzKlU59RbIYvG-vDG0h4X4yYMGAAJ1eO3_IDZdhokeF_FXfevECsIUWh8jtsSg6yGd_f3OBfyUNDRx5YWIVtp0-mBjPT5cYblE0ksuUzlXHZjDe6wiHkJSREscxydPk8AyKycbrr1cpy5FDGSpTyFp3B_JN8_qZUGCpTsm51MgMVTLbguSFF4TjRNBd8hPJE65dHMEk9WeOPCgSfSRqss40RwRNkKjgbRGemECHxfPC_Lk4yeGVbfdYlXCCARJtA';
const invalidToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImVCWl9jbjNzWFlBZDBjaDRUSEJLSElnT3dPRSIsImtpZCI6Ijc4MTY3RjcyN0RFQzVEODAxREQxQzg3ODRDNzA0QTFDODgwRUMwRTEifQ.eyJqdGkiOiIzYjFmOGIwYS1jOTkyLTRjZTktYmQxNy1lNWQwMTlhNDE5MjciLCJzdWIiOiJyZXBvOm10aGJlcm5hcmRlcy9hY3Rpb25zLXRlc3Q6cmVmOnJlZnMvaGVhZHMvbWFpbiIsImF1ZCI6Im82cyIsInJlZiI6InJlZnMvaGVhZHMvbWFpbiIsInNoYSI6ImNkYThmNGJiN2ZmNjg5NjJmODMxNjczYzU1NDc5ZjUzNjcwM2MzOTEiLCJyZXBvc2l0b3J5IjoibXRoYmVybmFyZGVzL2FjdGlvbnMtdGVzdCIsInJlcG9zaXRvcnlfb3duZXIiOiJtdGhiZXJuYXJkZXMiLCJyZXBvc2l0b3J5X293bmVyX2lkIjoiMTI2NDg5MjQiLCJydW5faWQiOiIyNzIyMjM2NjU5IiwicnVuX251bWJlciI6IjE4IiwicnVuX2F0dGVtcHQiOiIxIiwicmVwb3NpdG9yeV92aXNpYmlsaXR5IjoicHJpdmF0ZSIsInJlcG9zaXRvcnlfaWQiOiI1MTYxOTE1MjkiLCJhY3Rvcl9pZCI6IjEyNjQ4OTI0IiwiYWN0b3IiOiJtdGhiZXJuYXJkZXMiLCJ3b3JrZmxvdyI6ImdlbmVyYXRlLXRva2VuIiwiaGVhZF9yZWYiOiIiLCJiYXNlX3JlZiI6IiIsImV2ZW50X25hbWUiOiJ3b3JrZmxvd19kaXNwYXRjaCIsInJlZl90eXBlIjoiYnJhbmNoIiwiam9iX3dvcmtmbG93X3JlZiI6Im10aGJlcm5hcmRlcy9hY3Rpb25zLXRlc3QvLmdpdGh1Yi93b3JrZmxvd3MvZ2VuZXJhdGUtdG9rZW4ueW1sQHJlZnMvaGVhZHMvbWFpbiIsImlzcyI6Imh0dHBzOi8vdG9rZW4uYWN0aW9ucy5naXRodWJ1c2VyY29udGVudC5jb20iLCJuYmYiOjE2NTg1NDQ3MjQsImV4cCI6MTY1ODU0NTYyNCwiaWF0IjoxNjU4NTQ1MzI0fQ.';
describe('testing token valitadion and claims extraction', () => {
    test('token not valid', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(extractClaims(invalidToken)).rejects.toThrow('signature verification failed');
    }));
    test('token not provided', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(extractClaims('')).rejects.toThrow('Invalid Compact JWS');
    }));
    test('expired token should return an exception', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(extractClaims(expiredToken)).rejects.toThrow('"exp" claim timestamp check failed');
    }));
});
