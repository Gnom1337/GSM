using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Domain.Common
{
    public class Result<TValue>
    {
        public bool IsSuccess { get; }
        public bool IsFailure => !IsSuccess;
        public TValue? Value { get; }
        public Error Error { get; }
        private Result(TValue value) 
        {
            IsSuccess = true;
            Value = value;
            Error = Error.None;
        }
        public static Result<TValue> Success(TValue value) => new(value);
        public static Result<Error> Failure(Error error) => new(error);
    }
    public record Error(string Code, string Description)
    {
        public static readonly Error None = new(string.Empty, string.Empty);
    }
}
